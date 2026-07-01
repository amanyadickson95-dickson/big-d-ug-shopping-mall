// ======================================================
// 1. FIREBASE CONFIGURATION (LOADED FROM YOUR DASHBOARD)
// ======================================================
const firebaseConfig = {
    apiKey: "AIzaSyAoOM8I-o5CpmA9_kNpaVRYdCrTDR1Wnf4",
    authDomain: "studio-328883854-f9b5b.firebaseapp.com",
    projectId: "studio-328883854-f9b5b",
    storageBucket: "studio-328883854-f9b5b.firebasestorage.app",
    messagingSenderId: "645236372393",
    appId: "1:645236372393:web:cdfb59c3d5eaa4e7dc8ab8"
};

// Initialize Firebase Core Engine Hooks
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Global App Sync Memory Registries (Starts Empty! We populate this directly from Firebase)
let structuralDatabase = [];
let currentFilter = "all";
let searchQuery = "";
let calculatedFee = 3000;

// Track Google Session via local client storage browser cookies
let isGoogleUserLoggedIn = localStorage.getItem('isGoogleUserLoggedIn') === 'true';
const ADMIN_PASSWORD = "27270";

// ======================================================
// 2. LIVE FIRESTORE SYNC LISTEN PIPELINE
// ======================================================
function attachRealtimeDatabaseListener() {
    // This connects live to your database collection. It triggers immediately on load AND on changes.
    db.collection("ads").onSnapshot((snapshot) => {
        structuralDatabase = [];
        
        snapshot.forEach((doc) => {
            structuralDatabase.push({
                firestoreId: doc.id, 
                ...doc.data()
            });
        });

        // Instant UI feedback reload engine loops
        renderAds();
        
        const adminModal = document.getElementById('adminModal');
        if (adminModal && adminModal.classList.contains('active')) {
            renderAdminDashboard();
        }
    }, (error) => {
        console.error("Firestore Pipe Interruption: ", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Start live collection data stream immediately when the page loads
    attachRealtimeDatabaseListener();

    // --- Hero Banner Slideshow Logic ---
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let currentSlideIndex = 0;

    if (slides.length > 0) {
        function transitionSlideshow() {
            slides[currentSlideIndex].classList.remove("active");
            dots[currentSlideIndex].classList.remove("active");
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add("active");
            dots[currentSlideIndex].classList.add("active");
        }
        setInterval(transitionSlideshow, 3500);
    }

    // --- DOM Interface Controls Cache Elements Mapping ---
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

    if (isGoogleUserLoggedIn) {
        googleAuthBtn.innerHTML = `<i class="fas fa-user-circle"></i> Google Account Connected`;
        googleAuthBtn.classList.add('logged-in');
    }

    setupCategoryFilters();
    setupSearchFunctionality();
    updateDynamicPricingNotice();

    itemCategory.addEventListener('change', updateDynamicPricingNotice);

    // --- Google Identity Sign-In Engine Hooks ---
    googleAuthBtn.addEventListener('click', () => {
        if (isGoogleUserLoggedIn) {
            isGoogleUserLoggedIn = false;
            localStorage.setItem('isGoogleUserLoggedIn', 'false');
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
        localStorage.setItem('isGoogleUserLoggedIn', 'true');
        googleAuthBtn.innerHTML = `<i class="fas fa-user-circle"></i> Google Account Connected`;
        googleAuthBtn.classList.add('logged-in');
        googleAuthModal.classList.remove('active');
        alert("✅ Authenticated successfully with Google!");
    });

    // --- Account Validation Modal Access Guards ---
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

    // ======================================================
    // 3. MAIN MARKET FEED INTERFACE RENDERERS
    // ======================================================
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
            
            // Set up a click listener using the unique Firestore document ID 
            adCard.addEventListener('click', () => openAdDetails(item.firestoreId));
            adCard.innerHTML = `
                <div class="ad-image" style="background-image: url('${item.images[0]}'); height: 170px; background-size: cover; background-position: center; border-radius: 4px 4px 0 0;"></div>
                <div class="ad-info" style="padding: 12px; background: white; border: 1px solid #e1e1e5; border-top: none; border-radius: 0 0 4px 4px;">
                    <h4 class="ad-title" style="font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:4px; color:#333;">${item.title}</h4>
                    <p class="ad-price" style="font-weight:bold; color:#2e7d32; font-size:14px; margin-bottom:6px;">UGX ${item.price}</p>
                    <div class="ad-meta-row" style="font-size:11px; color:#777;"><i class="fas fa-map-marker-alt"></i> ${item.location}</div>
                </div>
            `;
            adsGrid.appendChild(adCard);
        });
    }

    function openAdDetails(firestoreId) {
        const item = structuralDatabase.find(p => p.firestoreId === firestoreId);
        if(!item) return;

        document.getElementById('detailCategory').innerText = item.category.toUpperCase();
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
            thumb.style.width = "60px";
            thumb.style.height = "50px";
            thumb.style.backgroundSize = "cover";
            thumb.style.backgroundPosition = "center";
            thumb.style.borderRadius = "4px";
            thumb.style.cursor = "pointer";
            thumb.style.border = "2px solid transparent";
            if(idx === 0) thumb.style.borderColor = "#3a2ee2";
            thumb.style.backgroundImage = `url('${imgUrl}')`;
            
            thumb.addEventListener('click', () => {
                document.querySelectorAll('.thumb-img').forEach(t => { t.style.borderColor = "transparent"; });
                thumb.style.borderColor = "#3a2ee2";
                previewContainer.style.backgroundImage = `url('${imgUrl}')`;
            });
            thumbRow.appendChild(thumb);
        });

        detailsModal.classList.add('active'); 
    }

    // ======================================================
    // 4. TRANSACTION BACKEND MUTATIONS VIA CLOUD FIREBASE
    // ======================================================
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

        // Write directly to your live cloud document database
        db.collection("ads").add(verificationPayload)
            .then(() => {
                alert(`📥 Submission Logged under review online!\n\nOnce approved by the admin, your ad goes live instantly across all devices.`);
                document.getElementById('adForm').reset();
                document.getElementById('payeeName').value = "";
                document.getElementById('transactionId').value = "";
                adModal.classList.remove('active');
            })
            .catch((error) => {
                alert("Failed to sync ad online. Check connection protocols.");
                console.error("Firestore Error: ", error);
            });
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
                        <button class="approve-action-btn" data-firestore-id="${item.firestoreId}" style="background: #2e7d32; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: bold;">Approve</button>
                    </td>
                </tr>
            `;
        });

        tableHtml += `</tbody></table>`;
        container.innerHTML = tableHtml;

        const approveButtons = container.querySelectorAll('.approve-action-btn');
        approveButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const firestoreId = e.target.getAttribute('data-firestore-id');
                approveAd(firestoreId);
            });
        });
    }

    function approveAd(firestoreId) {
        if (!firestoreId) return;

        // Mutates status value on live cloud server node reference target
        db.collection("ads").doc(firestoreId).update({
            status: "active"
        })
        .then(() => {
            alert(`✅ Ad has been verified and published live successfully!`);
        })
        .catch((error) => {
            alert("Error updating database item states.");
            console.error("Firestore Update Error: ", error);
        });
    }
});
