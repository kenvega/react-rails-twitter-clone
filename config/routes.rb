Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
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
        resources :likes, only: [:create, :destroy]
      end
    end
  end

  # resources :tweets, only: [:index, :create, :show]
end
