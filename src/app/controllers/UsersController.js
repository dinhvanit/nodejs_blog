const { User } = require('../models');

class UsersController {
    // [GET] /users/register
    showRegisterForm(req, res) {
        res.render('users/register');
    }

    // [POST] /users/register
    async register(req, res) {
        const { name, username, email, password, password2 } = req.body;
        let errors = [];

        // Kiểm tra các trường bắt buộc
        if (!name || !username || !email || !password || !password2) {
            errors.push({ msg: 'Vui lòng điền tất cả các trường.' });
        }
        // Kiểm tra mật khẩu khớp
        if (password !== password2) {
            errors.push({ msg: 'Mật khẩu không khớp.' });
        }
        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            errors.push({ msg: 'Mật khẩu phải có ít nhất 6 ký tự.' });
        }

        if (errors.length > 0) {
            // Nếu có lỗi, render lại trang đăng ký với lỗi và dữ liệu đã nhập
            res.render('users/register', { errors, name, username, email });
        } else {
            try {
                // Kiểm tra xem email hoặc username đã tồn tại chưa
                const existingUser = await User.findOne({ where: { $or: [{ email }, { username }] } });
                
                if (existingUser) {
                    errors.push({ msg: 'Email hoặc Username đã được sử dụng.' });
                    res.render('users/register', { errors, name, username, email });
                } else {
                    // Tạo user mới (mật khẩu sẽ được hash tự động bởi Hook)
                    await User.create({ name, username, email, password });
                    req.flash('success_msg', 'Đăng ký thành công! Bây giờ bạn có thể đăng nhập.');
                    res.redirect('/users/login'); // Chuyển hướng đến trang đăng nhập
                }
            } catch (error) {
                console.error(error);
                // Xử lý lỗi
            }
        }
    }
}
module.exports = new UsersController();