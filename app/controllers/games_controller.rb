class GamesController < ApplicationController
    skip_before_action :authorize, only: [:index, :create]
    # GET /games and # GET /users/:id/games
    def index
        ## if nested route
        if params[:user_id]
            @user = User.find(params[:user_id])
            games = @user.all_games
        else
        games = Game.all;
        end
        render json: games
    end

    # GET /games/:id
    def show
        game = Game.find(params[:id]);
        render json: game
    end

    def create
        game = Game.create(game_params)
        render json: game, status: :created
    end

    private
    def game_params
        params.permit(:white_user_id, :black_user_id, :winner, :pgn)
    end

    

end
