// 1. INITIALIZE DATABASE FROM LOCALSTORAGE OR FALLBACK TO MOCK DATA
let structuralDatabase = JSON.parse(localStorage.getItem('mall_database'));

if (!structuralDatabase || structuralDatabase.length === 0) {
    structuralDatabase = [
        { 
            id: 1, 
            status: "active",
            category: "phones", 
            title: "iPhone 13 Pro Max - 256GB", 
            price: "2,500,000", 
            location: "Kampala", 
            contact: "0770123456", 
            description: "Super clean iPhone 13 Pro Max. Battery health is 88%. No scratches.",
            images: [
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
                "https://images.unsplash.com/photo-1565630916779-e303be97b6f5?w=500",
                "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500"
            ]
        },
        { 
            id: 2, 
            status: "active",
            category: "vehicles", 
            title: "Toyota Harrier 2015 Silver", 
            price: "68,000,000", 
            location: "Wakiso", 
            contact: "0701987654", 
            description: "Excellent driving condition Toyota Harrier. Low mileage.",
            images: [
                "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500",
                "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500",
                "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500"
            ]
        },
        { 
            id: 4, 
            status: "active",
            category: "real-estate", 
            title: "3 bedroom house", 
            price: "708,000,000", 
            location: "Nansana", 
            contact: "0701987654", 
            description: "it is a 3bedroom, self contained with a big parking space.",
            images: [
                "https://cdn.shopify.com/s/files/1/0567/3873/products/Contemporary3bedroomHouse-ID13418-01.jpg?v=1670930837",
                "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500"
            ]
        },
        { 
            id: 5, 
            status: "active",
            category: "kitchen-furniture", 
            title: "Modern 6-Chair Wooden Dining Set", 
            price: "1,800,000", 
            location: "Kampala", 
            contact: "0758648710", 
            description: "Durable pure mahogany wooden dining table with 6 comfortable cushions.",
            images: [
                "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?w=500",
                "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500",
                "https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=500"
            ]
        },
        { 
            id: 6, 
            status: "active",
            category: "fashion-style", 
            title: "Unisex Vintage Corduroy Jackets", 
            price: "45,000", 
            location: "Wandegeya", 
            contact: "0758648710", 
            description: "Premium thrift vintage jackets. Available in brown, beige, and black sizes M to XL.",
            images: [
                "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
                "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
                "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=500"
            ]
        },
        { 
            id: 7, 
            status: "active",
            category: "makeup", 
            title: "Matte Waterproof Lipstick Pack", 
            price: "35,000", 
            location: "Kampala", 
            contact: "0758648710", 
            description: "Long-lasting 12-color nude liquid matte lip gloss bundle setup.",
            images: [
                "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500",
                "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=500",
                "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500"
            ]
        }
    ];
    localStorage.setItem('mall_database', JSON.stringify(structuralDatabase));
}

let currentFilter = "all";
let searchQuery = "";
let calculatedFee = 3000;

// PERSIST GOOGLE SIGN-IN STATUS SO REFRESHING DOES NOT LOG USERS OUT
let isGoogleUserLoggedIn = localStorage.getItem('isGoogleUserLoggedIn') === 'true';

const ADMIN_PASSWORD = "27270";

// HELPER FUNCTION TO SAVE ANY DATA STATE CHANGES
function saveDatabaseToStorage() {
    localStorage.setItem('mall_database', JSON.stringify(structuralDatabase));
}

document.addEventListener("DOMContentLoaded", () => {
    // --- Hero Banner Slideshow Logic ---
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlideIndex = 0;

    function transitionSlideshow() {
        if(slides.length === 0) return;
        slides[currentSlideIndex].classList.remove("active");
        dots[currentSlideIndex].classList.remove("active");
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        slides[currentSlideIndex].classList.add("active");
        dots[currentSlideIndex].classList.add("active");
    }
    setInterval(transitionSlideshow, 3500);

    // --- Core UI Elements ---
    const adModal = document.getElementById('adModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    const googleAuthModal = document.getElementById('googleAuthModal');
    const googleAuthBtn = document.getElementById('googleAuthBtn');
    const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
    const confirmGoogleLoginBtn = document.getElementById('confirmGoogleLoginBtn');

    const adminModal = document.getElementById('adminModal');
    const openAdminBtn = document.getElementById('openAdminBtn');
    const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
    
    const stepDetails = document.getElementById('stepDetails');
    const stepPayment = document.getElementById('stepPayment');
    const adsGrid = document.getElementById('adsGrid');
    const feedHeading = document.getElementById('feedHeading');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const detailsModal = document.getElementById('detailsModal');
    const closeDetailsBtn = document.getElementById('closeDetailsBtn');
    const itemCategory = document.getElementById('itemCategory');
    
    const goToPaymentBtn = document.getElementById('goToPaymentBtn');
    const goToDetailsBtn = document.getElementById('goToDetailsBtn');
    const submitPaymentBtn = document.getElementById('submitPaymentBtn');

    // INITIAL REFRESH CHECK: Update Google button styling if user was previously logged in
    if (isGoogleUserLoggedIn) {
        googleAuthBtn.innerHTML = `<i class="fas fa-user-circle"></i> Google Account Connected`;
        googleAuthBtn.classList.add('logged-in');
    }

    renderAds();
    setupCategoryFilters();
    setupSearchFunctionality();
    updateDynamicPricingNotice();

    itemCategory.addEventListener('change', updateDynamicPricingNotice);

    // --- Google Auth Actions ---
    googleAuthBtn.addEventListener('click', () => {
        if (isGoogleUserLoggedIn) {
            isGoogleUserLoggedIn = false;
            localStorage.setItem('isGoogleUserLoggedIn', 'false'); // Save logged out state
            googleAuthBtn.innerHTML = `<i class="fab fa-google"></i> Sign In with Google`;
            googleAuthBtn.classList.remove('logged-in');
            alert("Signed out from Google Account.");
        } else {
            googleAuthModal.classList.add('active');
        }
    });

    closeAuthModalBtn.addEventListener('click', () => googleAuthModal.classList.remove('active'));

    confirmGoogleLoginBtn.addEventListener('click', () => {
        isGoogleUserLoggedIn = true;
        localStorage.setItem('isGoogleUserLoggedIn', 'true'); // Save login state permanently
        googleAuthBtn.innerHTML = `<i class="fas fa-user-circle"></i> Google Account Connected`;
        googleAuthBtn.classList.add('logged-in');
        googleAuthModal.classList.remove('active');
        alert("✅ Authenticated successfully with Google!");
    });

    // --- Ad Creation Gate Check ---
    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => { 
            if (!isGoogleUserLoggedIn) {
                googleAuthModal.classList.add('active');
                alert("🔒 Access Denied! Every user must login with a Google Account first before listing ads.");
                return;
            }
            adModal.classList.add('active'); 
            goToDetails(); 
        });
    }
    
    if (closeModalBtn) closeModalBtn.addEventListener('click', () => adModal.classList.remove('active'));
    
    if (openAdminBtn) {
        openAdminBtn.addEventListener('click', () => { 
            const accessKey = prompt("🔒 Enter Admin Access Pin:");
            if (accessKey === ADMIN_PASSWORD) {
                adminModal.classList.add('active'); 
                renderAdminDashboard(); 
            } else if (accessKey !== null) {
                alert("❌ Access Denied!");
            }
        });
    }
    
    if (closeAdminModalBtn) closeAdminModalBtn.addEventListener('click', () => adminModal.classList.remove('active'));
    if (closeDetailsBtn) closeDetailsBtn.addEventListener('click', () => detailsModal.classList.remove('active'));

    if (goToPaymentBtn) {
        goToPaymentBtn.addEventListener('click', () => {
            if (!document.getElementById('itemTitle').value || !document.getElementById('itemPrice').value || 
                !document.getElementById('itemLocation').value || !document.getElementById('itemContact').value ||
                !document.getElementById('itemDescription').value || 
                !document.getElementById('itemImage1').value || 
                !document.getElementById('itemImage2').value || 
                !document.getElementById('itemImage3').value) {
                alert("Please fill in all details, including all 3 required images to continue.");
                return;
            }
            document.getElementById('dynamicPriceBox').innerHTML = `Amount to Send: <strong>UGX ${calculatedFee.toLocaleString()}</strong>`;
            stepDetails.classList.remove('active');
            stepPayment.classList.add('active');
        });
    }

    if (goToDetailsBtn) goToDetailsBtn.addEventListener('click', goToDetails);
    if (submitPaymentBtn) submitPaymentBtn.addEventListener('click', processManualPaymentSubmit);

    function goToDetails() { stepPayment.classList.remove('active'); stepDetails.classList.add('active'); }

    function updateDynamicPricingNotice() {
        const selectedCat = itemCategory.value;
        const priceTagLabel = document.getElementById('categoryPriceTag');
        if (!priceTagLabel) return;
        if (selectedCat === "vehicles" || selectedCat === "real-estate") {
            calculatedFee = 30000;
            priceTagLabel.innerText = "Premium Category Listing Fee: UGX 30,000 / month";
        } else {
            calculatedFee = 3000;
            priceTagLabel.innerText = "Standard Category Listing Fee: UGX 3,000";
        }
    }

    function setupSearchFunctionality() {
        searchInput.addEventListener('input', (e) => { searchQuery = e.target.value.toLowerCase().trim(); renderAds(); });
        searchBtn.addEventListener('click', () => { searchQuery = searchInput.value.toLowerCase().trim(); renderAds(); });
    }

    function setupCategoryFilters() {
        const categories = document.querySelectorAll('.cat-card');
        categories.forEach(card => {
            card.addEventListener('click', () => {
                categories.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                currentFilter = card.getAttribute('data-category');
                renderAds();
            });
        });
    }

    function renderAds() {
        adsGrid.innerHTML = ""; 
        let approvedItems = structuralDatabase.filter(item => item.status === "active");
        let itemsToDisplay = currentFilter === "all" ? approvedItems : approvedItems.filter(item => item.category === currentFilter);
            
        if (searchQuery !== "") {
            itemsToDisplay = itemsToDisplay.filter(item => 
                item.title.toLowerCase().includes(searchQuery) || 
                item.description.toLowerCase().includes(searchQuery) ||
                item.location.toLowerCase().includes(searchQuery)
            );
            feedHeading.innerText = `Search Results for "${searchQuery}"`;
        } else {
            feedHeading.innerText = `Trending Ads (${currentFilter.toUpperCase().replace("-", " ")})`;
        }

        if(itemsToDisplay.length === 0) {
            adsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; padding: 40px; color:#999;">No verified items listed.</p>`;
            return;
        }

        itemsToDisplay.forEach(item => {
            const adCard = document.createElement('div');
            adCard.classList.add('ad-card');
            adCard.addEventListener('click', () => openAdDetails(item.id));
            adCard.innerHTML = `
                <div class="ad-image" style="background-image: url('${item.images[0]}');"></div>
                <div class="ad-info">
                    <h4 class="ad-title">${item.title}</h4>
                    <p class="ad-price">UGX ${item.price}</p>
                    <div class="ad-meta-row"><span><i class="fas fa-map-marker-alt"></i> ${item.location}</span></div>
                </div>
            `;
            adsGrid.appendChild(adCard);
        });
    }

    function openAdDetails(id) {
        const item = structuralDatabase.find(p => p.id === id);
        if(!item) return;

        document.getElementById('detailCategory').innerText = item.category.toUpperCase().replace("-", " & ");
        document.getElementById('detailTitle').innerText = item.title;
        document.getElementById('detailPrice').innerText = `UGX ${item.price}`;
        document.getElementById('detailLocation').innerText = item.location;
        document.getElementById('detailDescription').innerText = item.description;
        
        document.getElementById('detailCallBtn').href = `tel:${item.contact}`;
        document.getElementById('detailSampleWaBtn').href = `https://wa.me/${item.contact}?text=Hello,%20I%20am%20interested%20in%20your%20ad:%20${encodeURIComponent(item.title)}`;

        const previewContainer = document.getElementById('detailMainImg');
        previewContainer.style.backgroundImage = `url('${item.images[0]}')`;
        
        const thumbRow = document.getElementById('detailThumbnails');
        thumbRow.innerHTML = "";
        item.images.forEach((imgUrl, idx) => {
            if(!imgUrl) return;
            const thumb = document.createElement('div');
            thumb.classList.add('thumb-img');
            if(idx === 0) thumb.classList.add('active');
            thumb.style.backgroundImage = `url('${imgUrl}')`;
            thumb.addEventListener('click', () => {
                document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                previewContainer.style.backgroundImage = `url('${imgUrl}')`;
            });
            thumbRow.appendChild(thumb);
        });

        detailsModal.classList.add('active'); 
    }

    function processManualPaymentSubmit() {
        const payeeName = document.getElementById('payeeName').value.trim();
        const transactionId = document.getElementById('transactionId').value.trim();

        if(!payeeName || !transactionId) {
            alert("Please supply payment fields.");
            return;
        }

        const verificationPayload = {
            id: Date.now(),
            status: "pending", 
            payeeName: payeeName,
            transactionId: transactionId,
            category: itemCategory.value,
            title: document.getElementById('itemTitle').value,
            price: Number(document.getElementById('itemPrice').value).toLocaleString(),
            location: document.getElementById('itemLocation').value,
            contact: document.getElementById('itemContact').value,
            description: document.getElementById('itemDescription').value,
            images: [
                document.getElementById('itemImage1').value,
                document.getElementById('itemImage2').value,
                document.getElementById('itemImage3').value
            ]
        };

        structuralDatabase.unshift(verificationPayload);
        saveDatabaseToStorage();
        
        alert(`📥 Submission Logged under review!\n\nOnce approved by admin, your ad goes live.`);
        document.getElementById('adForm').reset();
        document.getElementById('payeeName').value = "";
        document.getElementById('transactionId').value = "";
        adModal.classList.remove('active');
        renderAds();
    }

    function renderAdminDashboard() {
        const container = document.getElementById('adminTableContainer');
        let pendingItems = structuralDatabase.filter(item => item.status === "pending");

        if (pendingItems.length === 0) {
            container.innerHTML = `<p style="text-align: center; padding: 20px; color: #777;">No pending ads to approve right now.</p>`;
            return;
        }

        let tableHtml = `
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px;">
                <thead>
                    <tr style="background: #f4f4f4; border-bottom: 2px solid #ddd; text-align: left;">
                        <th style="padding: 10px;">Item Details</th>
                        <th style="padding: 10px;">Sender Name</th>
                        <th style="padding: 10px;">Transaction ID</th>
                        <th style="padding: 10px; text-align: center;">Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        pendingItems.forEach(item => {
            tableHtml += `
                <tr style="border-bottom: 1px solid #eee;">
                    <td style="padding: 10px;"><strong>${item.title}</strong><br><span style="color:#777;">${item.category} | UGX ${item.price}</span></td>
                    <td style="padding: 10px;">${item.payeeName}</td>
                    <td style="padding: 10px;"><code style="background: #fff3e0; padding: 2px 6px; border-radius: 4px; color: #e65100;">${item.transactionId}</code></td>
                    <td style="padding: 10px; text-align: center;">
                        <button class="approve-action-btn" data-id="${item.id}" style="background: #2e7d32; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">Approve</button>
                    </td>
                </tr>
            `;
        });

        tableHtml += `</tbody></table>`;
        container.innerHTML = tableHtml;

        const approveButtons = container.querySelectorAll('.approve-action-btn');
        approveButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const adId = parseInt(e.target.getAttribute('data-id'));
                approveAd(adId);
            });
        });
    }

    function approveAd(id) {
        const item = structuralDatabase.find(p => p.id === id);
        if (item) {
            item.status = "active";
            saveDatabaseToStorage();
            alert(`✅ "${item.title}" has been verified and published live successfully!`);
            renderAdminDashboard();
            renderAds();
        }
    }
});
