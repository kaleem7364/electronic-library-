document.addEventListener('DOMContentLoaded', function() {
    // متغيرات عامة
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const bookUploadForm = document.getElementById('book-upload-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const hasSubmenus = document.querySelectorAll('.has-submenu');
    
    // بيانات وهمية للبحث
    const sampleBooks = [
        { title: 'تعلم البرمجة بلغة JavaScript', author: 'أحمد محمد', category: 'علوم الحاسوب' },
        { title: 'مدخل إلى الذكاء الاصطناعي', author: 'د. سامي عبد الله', category: 'علوم الحاسوب' },
        { title: 'تصميم واجهات المستخدم الحديثة', author: 'ليلى أحمد', category: 'تصميم' },
        { title: 'علم البيانات من البداية', author: 'د. خالد سعيد', category: 'علوم البيانات' },
        { title: 'أساسيات الشبكات الحاسوبية', author: 'محمد علي', category: 'شبكات' }
    ];
    
    // فتح وإغلاق النوافذ المنبثقة
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    loginBtn.addEventListener('click', () => openModal(loginModal));
    registerBtn.addEventListener('click', () => openModal(registerModal));
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
    });
    
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal(registerModal);
        openModal(loginModal);
    });
    
    // إغلاق النافذة عند النقر خارجها
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // نظام البحث
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        if (searchTerm.length === 0) {
            searchResults.classList.remove('active');
            return;
        }
        
        const results = sampleBooks.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm) ||
            book.category.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(results);
    });
    
    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">لا توجد نتائج</div>';
            searchResults.classList.add('active');
            return;
        }
        
        results.forEach(book => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.innerHTML = `
                <h4>${book.title}</h4>
                <p>${book.author} - ${book.category}</p>
            `;
            searchResults.appendChild(resultItem);
        });
        
        searchResults.classList.add('active');
    }
    
    // إغلاق نتائج البحث عند النقر خارجها
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // القوائم الفرعية
    hasSubmenus.forEach(item => {
        const link = item.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                item.classList.toggle('active');
            }
        });
    });
    
    // نموذج رفع الكتاب
    if (bookUploadForm) {
        bookUploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('book-title').value;
            const author = document.getElementById('book-author').value;
            const category = document.getElementById('book-category').value;
            const formats = Array.from(document.querySelectorAll('input[name="format"]:checked')).map(el => el.value);
            const file = document.getElementById('book-file').files[0];
            
            if (!title || !author || !category || formats.length === 0 || !file) {
                alert('الرجاء ملء جميع الحقول المطلوبة');
                return;
            }
            
            // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
            alert(`تم استلام كتاب "${title}" بنجاح وسيتم مراجعته من قبل الإدارة`);
            this.reset();
        });
    }
    
    // نموذج تسجيل الدخول
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // هنا يمكنك إضافة كود للتحقق من صحة البيانات
            alert('تم تسجيل الدخول بنجاح!');
            closeModal(loginModal);
        });
    }
    
    // نموذج إنشاء حساب
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            
            if (password !== confirmPassword) {
                alert('كلمة المرور غير متطابقة');
                return;
            }
            
            // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
            alert(`تم إنشاء حساب لـ ${name} بنجاح!`);
            closeModal(registerModal);
        });
    }
    
    // إضافة تأثيرات عند التمرير
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // يمكنك إضافة تأثيرات هنا حسب موقع التمرير
    });
    
    // تحميل المزيد من الكتب عند التمرير إلى الأسفل (تأثير لا نهائي)
    window.addEventListener('scroll', function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            // هنا يمكنك إضافة كود لتحميل المزيد من الكتب
        }
    });
    
    // تمكين القائمة الجانبية على الأجهزة المحمولة
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.classList.add('mobile-menu-btn');
    document.body.appendChild(mobileMenuBtn);
    
    mobileMenuBtn.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });
});
