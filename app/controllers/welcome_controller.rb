class WelcomeController < ApplicationController
  def index
    flash[:warning] = "welcome!"
  end
end
