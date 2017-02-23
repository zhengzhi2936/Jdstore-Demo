class AdminController < ApplicationController
  before_action :authenticate_user!
  before_action :require_is_admin

  layout "admin"
end
