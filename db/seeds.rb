# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

mainUser = User.create(username: "Jackson", password: "password", elo: 1200)
secondaryUser = User.create(username: "Ria", password: "password2", elo: 600)

computer = User.create(id: 999, username: "Computer", password: "beepboop", elo: 1000)

newGame = Game.create(winner: "w", white_user_id: mainUser.id, black_user_id: secondaryUser.id, pgn: "ppp/8/blah")
newGame2 = Game.create(winner: "b", white_user_id: secondaryUser.id, black_user_id: mainUser.id, pgn: "ppp/8/blah")
newGame3 = Game.create(winner: "b", white_user_id: mainUser.id, black_user_id: secondaryUser.id, pgn: "ppp/8/blah")

puts "Seeding complete"