module MessagesHelper
  def recipients_options(chosen_recipient = nil)
    options_for_select(User.all.map { |user| [user.email, user.id] }, chosen_recipient.nil? ? nil : chosen_recipient.id)
  end
end
