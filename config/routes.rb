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
  resources :orders do
    member do
      post :pay_with_alipay
      post :pay_with_wechat
    end
  end
  resources :cart_items
  resources :users, only: [:index]
  resources :messages, only: [:new, :create]
  resources :categories
  resources :products do
    put :favorite, on: :member
    resources :favorite do
      end
    member do
      post :add_to_cart
      post :upvote
    end
    collection do
      get :search
    end
    resources :posts
  end
  devise_for :users
  root 'products#index'
  namespace :admin do
    resources :products
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
