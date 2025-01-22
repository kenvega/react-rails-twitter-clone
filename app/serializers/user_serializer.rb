class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :created_at

  # TODO: remove comments if not used later
  # attribute :created_date do |user|
  #   user.created_at && user.created_at.strftime('%m/%d/%Y')
  # end

  # def created_date
  #   object.created_at&.strftime('%m/%d/%Y')
  # end

end
