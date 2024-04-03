# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Tweet.destroy_all
User.destroy_all

# create users
4.times do |i|
  user_number = i + 1
  email = "test#{user_number}@test.com"
  password = "123456"
  # username = "user#{user_number}"
  # display_name = "userD#{user_number}"

  # create users if not already
  user = User.find_or_initialize_by(email: email)

  if user.new_record?
    user.password = password
    # user.username = username
    # user.display_name = display_name

    # Path to the profile picture
    # path_to_image = Rails.root.join('app', 'assets', 'images', 'profile_pictures', "user#{user_number}.png")
    # Attach the profile picture
    # user.avatar.attach(io: File.open(path_to_image), filename: "user#{user_number}.png", content_type: 'image/png')

    user.save!
  end
end

users = User.all

users.each do |user|
  4.times do |j|
    Tweet.create(
      user: user,
      body: Faker::Lorem.sentence(word_count: 4)
    )
  end
end

