from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.views.generic.edit import UpdateView

class SignUpForm(UserCreationForm):
	first_name = forms.CharField(max_length=30, required=True, help_text='Required.')
	last_name = forms.CharField(max_length=30, required=True, help_text='Required.')
	email = forms.EmailField(max_length=254, required=True, help_text='Required. Inform a valid email address.')
	DOB = forms.DateField(required=True, help_text='Required. Input in "YYYY-MM-DD".')

	class Meta:
		model = User	
		fields = ('username', 'first_name', 'last_name', 'email', 'DOB', 'password1', 'password2',)
		
class EmailChangeForm(forms.Form):
	error_messages = {'email_mismatch': ("The two email addresses fields didn't match"), 'not_changed': ("The email address is the same as the one already defined."),}
	
	new_email1 = forms.EmailField(label=("New email address"), widget=forms.EmailInput,)
	
	new_email2 = forms.EmailField(label=("New email address confirmation"), widget=forms.EmailInput,)

	def __init__(self, user, *args, **kwargs):
		self.user = user
		super(EmailChangeForm, self).__init__(*args, **kwargs)

	def clean_new_email1(self):
		old_email = self.user.email
		new_email1 = self.cleaned_data.get('new_email1')
		if new_email1 and old_email:
			if new_email1 == old_email:
				raise forms.ValidationError(
					self.error_messages['not_changed'],
					code='not_changed',
				)
		return new_email1

	def clean_new_email2(self):
		new_email1 = self.cleaned_data.get('new_email1')
		new_email2 = self.cleaned_data.get('new_email2')
		if new_email1 and new_email2:
			if new_email1 != new_email2:
				raise forms.ValidationError(
					self.error_messages['email_mismatch'],
					code='email_mismatch',
				)
		return new_email2

	def save(self, commit=True):
		email = self.cleaned_data["new_email1"]
		self.user.email = email
		if commit:
			self.user.save()
		return self.user


