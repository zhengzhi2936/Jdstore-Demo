u = User.new
u.email = "zhengzhi2616@123.com"           # 可以改成自己的 email

u.password = "abc123123"                # 最少要六码

u.password_confirmation = "abc123123"   # 最少要六码

u.is_admin = true
u.save


u = User.new
u.email = "chenjunhong@163.com"           # 可以改成自己的 email

u.password = "123123abc"                # 最少要六码

u.password_confirmation = "123123abc"   # 最少要六码

u.is_admin = true
u.save
