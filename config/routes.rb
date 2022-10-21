Rails.application.routes.draw do

  resources :games, only: [:index, :show, :create, :destroy]

  resources :users, only: [:index, :show, :create, :destroy] do
    resources :games
  end

  resources :sessions

  post '/login', to: 'sessions#create'
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  delete '/logout', to: 'sessions#destroy'
end
