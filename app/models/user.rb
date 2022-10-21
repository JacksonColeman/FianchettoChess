class User < ApplicationRecord
    has_secure_password

    ## Validations
    # validates :username, presence: true, length: {maximum: 15}, uniqueness: true
    # validates :password_digest, presence: true, length: {minimum: 8}

    ##
    has_many :white_games, class_name: "Game", foreign_key: "white_user_id"
    has_many :black_games, class_name: "Game", foreign_key: "black_user_id"

    def all_games
        return self.white_games + self.black_games
    end

    def won_games
        return self.white_games.where(winner: "w") + self.black_games.where(winner: "b")
    end

    def drawn_games
        return self.all_games.where(winner: "d")
    end

    def lost_games
        return self.white_games.where(winner: "b") + self.black_games.where(winner: "w")
    end

end
