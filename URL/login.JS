// بيانات الترجمة
const translations = {
    ar: {
        pageTitle: "DIAA.URL - تسجيل الدخول",
        appName: "DIAA.URL",
        welcome: "مرحباً بك  ",
        loginTab: "تسجيل الدخول",
        registerTab: "إنشاء حساب",
        usernameLabel: "اسم المستخدم أو البريد الإلكتروني",
        usernamePlaceholder: "أدخل اسم المستخدم أو البريد الإلكتروني",
        passwordLabel: "كلمة المرور",
        passwordPlaceholder: "أدخل كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
        loginButton: "تسجيل الدخول",
        or: "أو",
        googleLogin: "تسجيل الدخول عبر جوجل",
        chooseUsername: "اختر اسم مستخدم",
        emailLabel: "البريد الإلكتروني",
        emailPlaceholder: "أدخل بريدك الإلكتروني",
        choosePassword: "اختر كلمة مرور قوية",
        confirmPassword: "تأكيد كلمة المرور",
        repeatPassword: "أعد إدخال كلمة المرور",
        registerButton: "إنشاء حساب",
        googleRegister: "التسجيل عبر جوجل"
    },
    en: {
        pageTitle: "DIAA.URL - Login",
        appName: "DIAA.URL",
        welcome: "Welcome to ",
        loginTab: "Login",
        registerTab: "Register",
        usernameLabel: "Username or Email",
        usernamePlaceholder: "Enter your username or email",
        passwordLabel: "Password",
        passwordPlaceholder: "Enter your password",
        forgotPassword: "Forgot password?",
        loginButton: "Login",
        or: "OR",
        googleLogin: "Login with Google",
        chooseUsername: "Choose a username",
        emailLabel: "Email",
        emailPlaceholder: "Enter your email",
        choosePassword: "Choose a strong password",
        confirmPassword: "Confirm Password",
        repeatPassword: "Repeat your password",
        registerButton: "Register",
        googleRegister: "Register with Google"
    },
    tr: {
        pageTitle: "DIAA.URL - Giriş",
        appName: "DIAA.URL",
        welcome: " Hoş Geldiniz",
        loginTab: "Giriş Yap",
        registerTab: "Kayıt Ol",
        usernameLabel: "Kullanıcı Adı veya E-posta",
        usernamePlaceholder: "Kullanıcı adı veya e-posta girin",
        passwordLabel: "Şifre",
        passwordPlaceholder: "Şifrenizi girin",
        forgotPassword: "Şifremi Unuttum?",
        loginButton: "Giriş Yap",
        or: "VEYA",
        googleLogin: "Google ile Giriş Yap",
        chooseUsername: "Kullanıcı adı seçin",
        emailLabel: "E-posta",
        emailPlaceholder: "E-postanızı girin",
        choosePassword: "Güçlü bir şifre seçin",
        confirmPassword: "Şifreyi Onayla",
        repeatPassword: "Şifrenizi tekrar girin",
        registerButton: "Kayıt Ol",
        googleRegister: "Google ile Kayıt Ol"
    }
};

// تغيير اللغة
function changeLanguage(lang) {
    // تغيير سمة اللغة واتجاه الصفحة
    //document.documentElement.lang = lang;
    //document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    // تحديث عنوان الصفحة
    document.title = translations[lang].pageTitle;
    
    // إزالة النشط من جميع أزرار اللغة
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // إضافة النشط للزر المحدد
    event.target.classList.add('active');
    
    // تحديث جميع النصوص المترجمة
    updateTranslations(lang);
    
    // تحديث العناصر النائبة
    updatePlaceholders(lang);
}

// تحديث النصوص المترجمة
function updateTranslations(lang) {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

// تحديث العناصر النائبة
function updatePlaceholders(lang) {
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
}

// نظام التبويبات
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // إزالة النشط من جميع الأزرار
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // إضافة النشط للزر المحدد
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// تسجيل الدخول
document.getElementById('login-btn').addEventListener('click', function() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (!username || !password) {
        alert(getTranslation('fillAllFields'));
        return;
    }
    
    // هنا يمكنك إضافة التحقق من صحة البيانات
    window.location.href = 'index.html';
});

// إنشاء حساب
document.getElementById('register-btn').addEventListener('click', function() {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (!username || !email || !password || !confirmPassword) {
        alert(getTranslation('fillAllFields'));
        return;
    }
    
    if (password !== confirmPassword) {
        alert(getTranslation('passwordMismatch'));
        return;
    }
    
    window.location.href = 'index.html';
});

// تسجيل الدخول عبر جوجل
document.getElementById('google-login').addEventListener('click', function() {
    alert(getTranslation('googleRedirect'));
});

document.getElementById('google-register').addEventListener('click', function() {
    alert(getTranslation('googleRedirect'));
});

// الحصول على ترجمة للنصوص الديناميكية
function getTranslation(key) {
    const lang = document.documentElement.lang || 'ar';
    return translations[lang][key] || key;
}

// تهيئة اللغة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // تحديد اللغة الافتراضية
    const defaultLang = 'en';
    changeLanguage(defaultLang);
});