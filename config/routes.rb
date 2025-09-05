# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do
      # TODO: here put the routes when they are working. check the changes in files to make too https://youtu.be/koiHRY8Be1A?feature=shared&t=192
      resources :tweets, only: [:index, :create, :show] do
        # you can use like (instead of 'likes') in route resources, but the controller will still be likes_controller
        resource :like, only: [:create, :destroy]
        resource :bookmark, only: [:create, :destroy]
        resource :retweet, only: [:create, :destroy]
      end

      resources :reply_tweets, only: [:index, :create]

      get 'profile', to: 'profile#show'

      get 'bookmarks', to: 'bookmarks#index'

      get 'users', to: 'users#index'
    end
  end

  # resources :tweets, only: [:index, :create, :show]
end
