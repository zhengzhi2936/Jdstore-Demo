namespace :dev do
  task :fake => :environment do
    Product.delete_all
    Category.delete_all

  puts 'Creating fake data'

  5.times do |i|
    c = Category.create(name: Faker::Commerce.department)
    10.times do |j|

      c.products.create(title: Faker::Commerce.product_name, description: Faker::Commerce.product_name,
      price: Faker::Commerce.price, quantity: Faker::Commerce.price )

    end
  end
  puts "fake data created."
  end
end
