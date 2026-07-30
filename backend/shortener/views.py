import ipaddress
import socket

from django.shortcuts import get_object_or_404, redirect, render
from .models import ShortenedURL
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .forms import CustomSignupForm
from urllib.error import HTTPError, URLError
from urllib.request import HTTPRedirectHandler, Request, build_opener
from urllib.parse import urlparse


def shorten_url(request):
    if request.method == 'POST':
        original_url = request.POST.get('url')

        # Verify if the provided URL is real and accessible
        is_valid, error_message = _is_url_accessible(original_url)

        if is_valid:
            # URL is valid, proceed to create a shortened URL

            # Check if the user is authenticated
            if request.user.is_authenticated:
                new_short_url = ShortenedURL.objects.create(original_url=original_url, created_by=request.user)

            else:
                new_short_url = ShortenedURL.objects.create(original_url=original_url)  # No created_by if user is anonymous

            shortened_url = request.build_absolute_uri(f'/shortener/{new_short_url.short_code}')
            return render(request, 'shortener/index.html', {'shortened_url': shortened_url})
        
        if error_message:
            messages.error(request, error_message)

    return render(request, 'shortener/index.html')

class _NoRedirectHandler(HTTPRedirectHandler):
    """Stop urllib from silently following a redirect into a private address."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


# Opener that refuses redirects, so every URL we touch has been vetted first.
_SAFE_OPENER = build_opener(_NoRedirectHandler)

# Hostnames that resolve to the machine itself regardless of DNS.
_BLOCKED_HOSTNAMES = {'localhost', 'metadata', 'metadata.google.internal'}

# Many hosts reject the default "Python-urllib" agent outright.
_USER_AGENT = (
    'Mozilla/5.0 (compatible; PortfolioURLShortener/1.0; '
    '+https://carlosjportfolio.com)'
)

# The host answered, it just refuses automated clients — the URL is still real.
_BOT_BLOCKED_CODES = {401, 403, 405, 406, 429, 999}


def _is_public_host(hostname):
    """Return (ok, error) after checking every address a hostname resolves to.

    Blocks loopback, private, link-local (including the cloud metadata endpoint
    at 169.254.169.254), and other reserved ranges to prevent SSRF.
    """
    if not hostname:
        return False, 'Please provide a valid HTTP or HTTPS URL.'

    if hostname.lower().rstrip('.') in _BLOCKED_HOSTNAMES:
        return False, 'That host is not allowed.'

    try:
        addr_info = socket.getaddrinfo(hostname, None)
    except socket.gaierror:
        return False, 'The provided URL is invalid or cannot be reached.'

    for info in addr_info:
        ip_str = info[4][0]
        try:
            ip = ipaddress.ip_address(ip_str)
        except ValueError:
            return False, 'That host is not allowed.'

        if (
            ip.is_private
            or ip.is_loopback
            or ip.is_link_local
            or ip.is_reserved
            or ip.is_multicast
            or ip.is_unspecified
        ):
            return False, 'That host is not allowed.'

        # IPv6-mapped IPv4 (::ffff:127.0.0.1) sidesteps the checks above.
        mapped = getattr(ip, 'ipv4_mapped', None)
        if mapped is not None and (
            mapped.is_private or mapped.is_loopback or mapped.is_link_local
        ):
            return False, 'That host is not allowed.'

    return True, None


def _is_url_accessible(url):
    """Return a tuple of (is_valid, error_message)."""
    if not url:
        return False, 'Please provide a URL to shorten.'

    if len(url) > 500:
        return False, 'That URL is too long.'

    parsed_url = urlparse(url)
    if parsed_url.scheme not in {'http', 'https'}:
        return False, 'Please provide a valid HTTP or HTTPS URL.'

    try:
        hostname = parsed_url.hostname
    except ValueError:
        return False, 'Please provide a valid HTTP or HTTPS URL.'

    is_public, host_error = _is_public_host(hostname)
    if not is_public:
        return False, host_error

    request = Request(url, method='HEAD', headers={'User-Agent': _USER_AGENT})

    try:
        with _SAFE_OPENER.open(request, timeout=5) as response:
            if 200 <= response.status < 400:
                return True, None
            return False, f'The provided URL is not accessible (Status Code: {response.status}).'
    except HTTPError as exc:
        # A 3xx surfaces here because redirects are disabled; treat it as reachable.
        if 300 <= exc.code < 400 or exc.code in _BOT_BLOCKED_CODES:
            return True, None
        return False, f'The provided URL is not accessible (Status Code: {exc.code}).'
    except URLError:
        # DNS errors, refused connections, etc.
        pass

    # Some servers might not allow HEAD requests; fall back to GET
    get_request = Request(url, headers={'User-Agent': _USER_AGENT})
    try:
        with _SAFE_OPENER.open(get_request, timeout=5) as response:
            if 200 <= response.status < 400:
                return True, None
            return False, f'The provided URL is not accessible (Status Code: {response.status}).'
    except HTTPError as exc:
        if 300 <= exc.code < 400 or exc.code in _BOT_BLOCKED_CODES:
            return True, None
        return False, f'The provided URL is not accessible (Status Code: {exc.code}).'
    except URLError:
        return False, 'The provided URL is invalid or cannot be reached.'


def signup(request):
    if request.method == 'POST':
        form = CustomSignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)  # Automatically log the user in after signup
            messages.success(request, 'Account created successfully!')
            return redirect('shortener:shorten_url')  # Redirect to the home page or shorten URL page after successful signup
    else:
        form = CustomSignupForm()  # Render the empty form when the request method is GET

    return render(request, 'registration/signup.html', {'form': form})  # Always return a response

@login_required
def user_links(request):
    # Handle deleting all links
    if 'delete_all' in request.POST:
        ShortenedURL.objects.filter(created_by=request.user).delete()
        return redirect('shortener:user_links')
    
    # Handle deleting individual links
    if 'delete_link' in request.POST:
        link_id = request.POST.get('link_id')
        ShortenedURL.objects.filter(id=link_id, created_by=request.user).delete()
        return redirect('shortener:user_links')

    # Get all links for the logged-in user and generate the full URLs
    user_links = ShortenedURL.objects.filter(created_by=request.user)
    for link in user_links:
        # Ensure the URL is built from the root (by prepending '/')
        link.full_url = request.build_absolute_uri(f'/shortener/{link.short_code}')
    return render(request, 'shortener/user_links.html', {'user_links': user_links})

def redirect_url(request, short_code):
    short_url = get_object_or_404(ShortenedURL, short_code=short_code)
    return redirect(short_url.original_url)
