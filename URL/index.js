
         // بيانات الترجمة
         const translations = {
            ar: {
                appName: "DIAA.URL",
                createLinks: "إنشاء روابط جديدة",
                yourName: "اسمك",
                yourBio: "وصف قصير",
                profileImage: "صورة الملف الشخصي (رابط)",
                addLink: "إضافة رابط جديد",
                saveProfile: "حفظ وإنشاء رابط",
                yourLink: "رابطك الشخصي:",
                copyLink: "نسخ الرابط",
                namePlaceholder: "أدخل اسمك",
                bioPlaceholder: "اكتب وصفاً عنك",
                imagePlaceholder: "https://example.com/image.jpg",
                linkTitle: "عنوان الرابط",
                linkUrl: "رابط URL",
                linkIcon: "الأيقونة (اختياري)",
                linkDesc: "وصف الرابط (اختياري)",
                deleteLink: "حذف الرابط"
            },
            en: {
                appName: "DIAA.URL",
                createLinks: "Create New Links",
                yourName: "Your Name",
                yourBio: "Short Bio",
                profileImage: "Profile Image (URL)",
                addLink: "Add New Link",
                saveProfile: "Save & Create Link",
                yourLink: "Your Personal Link:",
                copyLink: "Copy Link",
                namePlaceholder: "Enter your name",
                bioPlaceholder: "Write a short bio",
                imagePlaceholder: "https://example.com/image.jpg",
                linkTitle: "Link Title",
                linkUrl: "Link URL",
                linkIcon: "Icon (optional)",
                linkDesc: "Description (optional)",
                deleteLink: "Delete Link"
            },
            tr: {
                appName: "DIAA.URL",
                createLinks: "Yeni Bağlantılar Oluştur",
                yourName: "Adınız",
                yourBio: "Kısa Bio",
                profileImage: "Profil Resmi (URL)",
                addLink: "Yeni Bağlantı Ekle",
                saveProfile: "Kaydet & Bağlantı Oluştur",
                yourLink: "Kişisel Bağlantınız:",
                copyLink: "Bağlantıyı Kopyala",
                namePlaceholder: "Adınızı girin",
                bioPlaceholder: "Kısa bir bio yazın",
                imagePlaceholder: "https://example.com/image.jpg",
                linkTitle: "Bağlantı Başlığı",
                linkUrl: "Bağlantı URL",
                linkIcon: "Simge (isteğe bağlı)",
                linkDesc: "Açıklama (isteğe bağlı)",
                deleteLink: "Bağlantıyı Sil"
            }
        };
        // بيانات التطبيق
        let userLinks = [];
        let currentUserId = null;
        let currentLanguage = localStorage.getItem('language') || 'ar';

        // تهيئة الصفحة
        function init() 
        {
            changeLanguage(currentLanguage); 
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get('id');
            
            if (userId) {
                loadUserProfile(userId);
                showSection('view');
            } else {
                showSection('create');
                addLinkField(); // إضافة حقل رابط افتراضي
            }
            
            setupEventListeners();
             // معاينة الصورة المرفوعة
    document.getElementById('user-image-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('حجم الصورة يجب أن يكون أقل من 2MB');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('image-preview').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

            
        }
        function changeLanguage(lang) {
            currentLanguage = lang;
            localStorage.setItem('language', lang);
        
        // تغيير اتجاه الصفحة
            //document.documentElement.lang = lang;
            //document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
            // تحديث النصوص المترجمة
            updateTranslations(lang);
            
            // تحديث العناصر الأخرى
            updatePlaceholders(lang);
        }
        
        // تحديث النصوص المترجمة
        function updateTranslations(lang) {
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.getAttribute('data-translate');
                el.textContent = translations[lang][key] || translations['ar'][key];
            });
        }

        function updatePlaceholders(lang) {
            document.getElementById('user-name').placeholder = translations[lang].namePlaceholder;
            document.getElementById('user-bio').placeholder = translations[lang].bioPlaceholder;
            document.getElementById('user-image').placeholder = translations[lang].imagePlaceholder;
        }


        // إضافة حقل رابط جديد
        function addLinkField(linkData = {title: '', url: '', icon: 'fas fa-link', description: ''}) {
            const linksForm = document.getElementById('links-form');
            const lang = currentLanguage;
            
            const linkField = document.createElement('div');
            linkField.className = 'card';
            linkField.style.marginBottom = '1rem';
            linkField.innerHTML = `
                <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                    <div style="flex: 1;">
                        <label data-translate="linkTitle">عنوان الرابط</label>
                        <input type="text" class="link-title" placeholder="${translations[lang].linkTitle}" value="${linkData.title}">
                    </div>
                    <div style="flex: 1;">
                        <label data-translate="linkUrl">رابط URL</label>
                        <input type="text" class="link-url" placeholder="${translations[lang].linkUrl}" value="${linkData.url}">
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem;">
                    <div style="flex: 1;">
                        <label data-translate="linkIcon">الأيقونة (اختياري)</label>
                        <input type="text" class="link-icon" placeholder="${translations[lang].linkIcon}" value="${linkData.icon}">
                    </div>
                    <div style="flex: 1;">
                        <label data-translate="linkDesc">وصف الرابط (اختياري)</label>
                        <input type="text" class="link-desc" placeholder="${translations[lang].linkDesc}" value="${linkData.description}">
                    </div>
                </div>
                
                <button class="btn btn-danger" onclick="this.parentNode.remove()" style="margin-top: 1rem;">
                    <i class="fas fa-trash"></i> <span data-translate="deleteLink">حذف الرابط</span>
                </button>
            `;
            
            linksForm.appendChild(linkField);
            updateTranslations(currentLanguage);
        }
        
        
        
        // حفظ الملف الشخصي
        function saveProfile() {
            const userName = document.getElementById('user-name').value;
            const userBio = document.getElementById('user-bio').value;
            const fileInput = document.getElementById('user-image-upload');
            const imageFile = fileInput.files[0];
            
            let imageUrl = 'https://via.placeholder.com/150';
            
            if (imageFile) {
                imageUrl = URL.createObjectURL(imageFile);
            }
            if (!userName) {
                alert('الرجاء إدخال اسمك');
                return;
            }
            
            // جمع بيانات الروابط
    const linkFields = document.querySelectorAll('#links-form .card');
    userLinks = [];
    
    linkFields.forEach(field => {
        const title = field.querySelector('.link-title').value;
        const url = field.querySelector('.link-url').value;
        const icon = field.querySelector('.link-icon').value;
        const description = field.querySelector('.link-desc').value;
        
        if (title && url) {
            userLinks.push({
                title,
                url: url.startsWith('http') ? url : `https://${url}`,
                icon: icon || 'fas fa-link',
                description
            });
        }
    });
    

            
            if (userLinks.length === 0) {
                alert('الرجاء إدخال على الأقل رابط واحد');
                return;
            }
            
           // حفظ البيانات
    const userData = {
        name: userName,
        bio: userBio,
        image: imageUrl,
        links: userLinks
    };
    // إنشاء رابط فريد
    currentUserId = generateUserId();
    localStorage.setItem(`user_${currentUserId}`, JSON.stringify(userData));
    
            
            // عرض الرابط المختصر
            const personalLink = `${window.location.origin}${window.location.pathname}?id=${currentUserId}`;
            document.getElementById('personal-link').href = personalLink;
            document.getElementById('personal-link').textContent = personalLink;
            
            // إنشاء QR Code
            document.getElementById('qrcode').innerHTML = '';
            new QRCode(document.getElementById('qrcode'), {
                text: personalLink,
                width: 180,
                height: 180,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            
            document.getElementById('generated-url').classList.remove('hidden');
            
            // عرض رسالة نجاح
            alert('تم حفظ صفحتك بنجاح! يمكنك الآن نسخ الرابط ووضعه في البايو');
        }
        
        // تحميل الملف الشخصي
        function loadUserProfile(userId) {
    const userData = JSON.parse(localStorage.getItem(`user_${userId}`));
    
    if (userData) {
        document.getElementById('profile-name').textContent = userData.name;
        document.getElementById('profile-bio').textContent = userData.bio;
        document.getElementById('profile-image').src = userData.image;
        
        const linksContainer = document.getElementById('links-container');
        linksContainer.innerHTML = '';
        
        userData.links.forEach(link => {
            const domain = getDomainFromUrl(link.url);
            const iconInfo = getIconForDomain(domain);
            
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.className = 'link';
            linkElement.target = '_blank';
            
            linkElement.innerHTML = `
                <div class="link-icon">
                    ${iconInfo.isFontAwesome ? 
                        `<i class="${iconInfo.icon}"></i>` : 
                        `<img src="${iconInfo.icon}" alt="${domain}">`}
                </div>
                <div class="link-content">
                    <div class="link-title">${link.title}</div>
                    ${link.description ? `<div class="link-desc">${link.description}</div>` : ''}
                </div>
            `;
            
            linksContainer.appendChild(linkElement);
        });
    }
}

// دالة لاستخراج النطاق من الرابط
function getDomainFromUrl(url) {
    try {
        const domain = new URL(url).hostname.replace('www.', '');
        return domain.split('.')[0]; // إرجاع الجزء الأول من النطاق (مثل 'facebook' من 'facebook.com')
    } catch {
        return 'default';
    }
}

// دالة لإرجاع الأيقونة المناسبة للنطاق
function getIconForDomain(domain) {
    const domainIcons = {
        'facebook': { icon: 'fab fa-facebook-f', isFontAwesome: true },
        'twitter': { icon: 'fab fa-twitter', isFontAwesome: true },
        'instagram': { icon: 'fab fa-instagram', isFontAwesome: true },
        'youtube': { icon: 'fab fa-youtube', isFontAwesome: true },
        'linkedin': { icon: 'fab fa-linkedin-in', isFontAwesome: true },
        'whatsapp': { icon: 'fab fa-whatsapp', isFontAwesome: true },
        'tiktok': { icon: 'fab fa-tiktok', isFontAwesome: true },
        'snapchat': { icon: 'fab fa-snapchat-ghost', isFontAwesome: true },
        'telegram': { icon: 'fab fa-telegram-plane', isFontAwesome: true },
        'discord': { icon: 'fab fa-discord', isFontAwesome: true },
        'pinterest': { icon: 'fab fa-pinterest-p', isFontAwesome: true },
        'reddit': { icon: 'fab fa-reddit-alien', isFontAwesome: true },
        'spotify': { icon: 'fab fa-spotify', isFontAwesome: true },
        'apple': { icon: 'fab fa-apple', isFontAwesome: true },
        'google': { icon: 'fab fa-google', isFontAwesome: true },
        'amazon': { icon: 'fab fa-amazon', isFontAwesome: true },
        'default': { icon: 'fas fa-link', isFontAwesome: true },
        'netflix': { icon: 'fab fa-netflix', isFontAwesome: true },
        'soundcloud': { icon: 'fab fa-soundcloud', isFontAwesome: true },
        'vimeo': { icon: 'fab fa-vimeo-v', isFontAwesome: true },
    

        'example': { 
    icon: 'https://example.com/logo.png', 
    isFontAwesome: false 
}

    };

   


    return domainIcons[domain.toLowerCase()] || domainIcons['default'];
    
}
        // نسخ الرابط
        function copyToClipboard() {
            const link = document.getElementById('personal-link');
            navigator.clipboard.writeText(link.href);
            alert('تم نسخ الرابط إلى الحافظة');
        }
        
        // إنشاء معرف مستخدم فريد
        function generateUserId() {
            return 'xxxxxx'.replace(/[x]/g, () => {
                return Math.floor(Math.random() * 16).toString(16);
            });
        }
        
        // إظهار وإخفاء الأقسام
        function showSection(sectionId) {
            document.getElementById('create-section').classList.add('hidden');
            document.getElementById('view-section').classList.add('hidden');
            
            document.getElementById(`${sectionId}-section`).classList.remove('hidden');
            
            // تحديث حالة أزرار التنقل
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            document.querySelector(`.nav-link[data-section="${sectionId}"]`).classList.add('active');
        }
        
        // إعداد مستمعي الأحداث
        function setupEventListeners() {
            // تسجيل الخروج
            document.getElementById('logout-btn').addEventListener('click', function() {
                window.location.href = 'login.html';
            });
            
            
            
            // تغيير اللغة
            document.querySelectorAll('.dropdown-menu a').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const lang = btn.getAttribute('data-lang');
                    //document.documentElement.lang = lang;
                    //document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
                });
            });
            
            // التنقل بين الأقسام
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const sectionId = this.getAttribute('data-section');
                    showSection(sectionId);
                });
            });
        }
        
        // بدء التطبيق
        window.addEventListener('DOMContentLoaded', init);

// تأثيرات ديناميكية
document.querySelector('.logo').addEventListener('click', function() {
    this.querySelector('img').style.transform = 'rotate(360deg)';
    setTimeout(() => {
        this.querySelector('img').style.transform = 'rotate(0deg)';
    }, 1000);
});