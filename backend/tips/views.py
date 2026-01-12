from django.shortcuts import render
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def tips(request):
    context = {
        "tip_methods": [
            {
                "slug": "cashapp",
                "name": "Cash App",
                "handle": "$cjibanez1999",
                "icon": "attach_money",
                "link": "https://cash.app/$cjibanez1999?qr=1",
            },
            {
                "slug": "venmo",
                "name": "Venmo",
                "handle": "@cjibanez1999",
                "icon": "account_balance_wallet",
                "link": "https://venmo.com/code?user_id=3479298832861037435",
            },
            {
                "slug": "zelle",
                "name": "Zelle",
                "handle": "7865375524",
                "icon": "account_balance",
                "link": "https://enroll.zellepay.com/qr-codes?data=eyJ0b2tlbiI6Ijc4NjUzNzU1MjQiLCJuYW1lIjoiQ0FSTE9TIn0=",
            },
        ],
        "highlights": [
            "Full-stack delivery from product strategy to cloud deployment",
            "Django, React, and API integrations for high-performing teams",
            "Security-first builds with monitoring, analytics, and QA automation",
        ],
        "tech_stack": [
            "Python",
            "Django",
            "TypeScript",
            "React",
            "PostgreSQL",
            "Docker",
            "Azure",
        ],
        "projects": [
            {
                "title": "VP Power Control",
                "summary": "Low-voltage systems marketing site built from a Figma design.",
                "tag": "Django + HTML",
                "link": "https://www.vppowercontrol.com",
            },
            {
                "title": "Yunior Ink",
                "summary": "Tattoo studio platform with booking, gallery CMS, and SEO.",
                "tag": "Django + Postgres",
                "link": "https://yunior.ink/",
            },
            {
                "title": "Break Tax Group",
                "summary": "Lead-generation website with scheduling and CRM flows.",
                "tag": "React + Vite",
                "link": "https://breaktaxgroup.com",
            },
        ],
    }

    return render(request, "tips/index.html", context)
