class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    # GET /users 
    def index
        users = User.all;
        render json: users
    end

    # /me, get current user
    def show
        render json: @current_user
    end

    def create
        user = User.create(user_params)
        # byebug
        session[:user_id] = user.id
        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :password, :elo)
    end

end
