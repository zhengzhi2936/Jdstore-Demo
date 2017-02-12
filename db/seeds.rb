u = User.new
u.email = "zhengzhi2616@gmail.com"           # 可以改成自己的 email

u.password = "Zz2936821"                # 最少要六码

u.password_confirmation = "Zz2936821"   # 最少要六码

u.is_admin = true
u.save
