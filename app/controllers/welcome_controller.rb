class WelcomeController < ApplicationController
	layout 'welcome'

	def index
		get_products
	end

	private

end
