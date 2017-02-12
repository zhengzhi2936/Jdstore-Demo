Rails.application.routes.draw do
  resources :conversations, only: [:index, :show, :destroy] do
    member do
      post :reply
      post :restore
      post :mark_as_read
    end
    collection do
      delete :empty_trash

    end
  end
  resources :carts do
    collection do
      delete :clean
      get :checkout
    end
  end
  namespace :account do
    resources :orders
  end
  resources :orders
  resources :cart_items
  resources :users, only: [:index]
  resources :messages, only: [:new, :create]
  resources :categories
  resources :products do
    member do
      post :add_to_cart
    end
    collection do
      get :search
    end
  end
  devise_for :users
  root 'products#index'
  namespace :admin do
    resources :products
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
