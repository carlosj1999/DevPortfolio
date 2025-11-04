from django.shortcuts import get_object_or_404, redirect, render
from .models import ShortenedURL
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .forms import CustomSignupForm
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
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

def _is_url_accessible(url):
    """Return a tuple of (is_valid, error_message)."""
    if not url:
        return False, 'Please provide a URL to shorten.'

    parsed_url = urlparse(url)
    if parsed_url.scheme not in {'http', 'https'}:
        return False, 'Please provide a valid HTTP or HTTPS URL.'

    request = Request(url, method='HEAD')

    try:
        with urlopen(request, timeout=5) as response:
            if 200 <= response.status < 400:
                return True, None
            return False, f'The provided URL is not accessible (Status Code: {response.status}).'
    except HTTPError as exc:
        # Received a valid response with an HTTP error status code
        return False, f'The provided URL is not accessible (Status Code: {exc.code}).'
    except URLError:
        # DNS errors, refused connections, etc.
        pass

    # Some servers might not allow HEAD requests; fall back to GET
    get_request = Request(url)
    try:
        with urlopen(get_request, timeout=5) as response:
            if 200 <= response.status < 400:
                return True, None
            return False, f'The provided URL is not accessible (Status Code: {response.status}).'
    except (HTTPError, URLError):
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
''' OLD
def shorten_url(request):
    if request.method == 'POST':
        original_url = request.POST.get('url')
        new_short_url = ShortenedURL.objects.create(original_url=original_url)
        shortened_url = request.build_absolute_uri(f'/{new_short_url.short_code}')  # Generates full URL
        return render(request, 'shortener/index.html', {'shortened_url': shortened_url})
    return render(request, 'shortener/index.html')
'''
def redirect_url(request, short_code):
    short_url = get_object_or_404(ShortenedURL, short_code=short_code)
    return redirect(short_url.original_url)
