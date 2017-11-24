"""SUTDAppStore URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.auth import views as auth_views
# from appstore import views as core_views
from appstore import views

urlpatterns = [
    # url(r'^login/$', auth_views.login, name='login'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^appstore/$', views.app_list),
    url(r'^appstore/(?P<pk>\d+)/$', views.app_detail),
    url(r'^appstore/feedback/(?P<pk>\d+)/$', views.app_feedback),
    url(r'^user/(?P<username>[\w.@+-]+)/$', views.user),
    url(r'^user/feedback/(?P<pk>\d+)/$', views.user_feedback),
    url(r'^user/purchase/(?P<pk>\d+)/$', views.user_purchase),
    url(r'^user/endorsement/(?P<pk>\d+)/$', views.user_endorsement),
    url(r'^appstore/feedback/endorsement/(?P<pk>\d+)/$', views.app_feedback_endorsement),
	# url(r'^signup/$', views.signup),
    url(r'^admin/$', admin.site.urls),
#	url(r'^login/$', auth_views.login, name='login'),
	# url(r'^logout/$', auth_views.logout, {'next_page': '/login'}, name='logout'),
	# url(r'^password/$', views.change_password, name='change_password'),
	# url(r'^particulars/$', views.edit_particulars, name='edit_particulars'),
	# url(r'^password_reset/$', auth_views.password_reset, name='password_reset'),
    # url(r'^password_reset/done/$', auth_views.password_reset_done, name='password_reset_done'),
    # url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        # auth_views.password_reset_confirm, name='password_reset_confirm'),
    # url(r'^reset/done/$', auth_views.password_reset_complete, name='password_reset_complete')
    ]
