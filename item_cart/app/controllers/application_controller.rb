class ApplicationController < ActionController::Base
	# changing to null_session instead of exception
	# since we are dealing with JSON requests
  protect_from_forgery with: :null_session
end
