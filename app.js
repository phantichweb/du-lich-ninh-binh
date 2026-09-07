/**
 * CỔNG DU LỊCH THÔNG MINH NINH BÌNH — JAVASCRIPT LOGIC
 * Tích hợp Bản đồ Leaflet GIS, Trình tạo Combo 4 bước, Chatbot AI & Đa ngôn ngữ
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initLeafletMap();
  initComboWizard();
  initAiChatbot();
  initModals();
  initMobileMenu();
  initHeroSlideshow();
});

/* ==========================================================================
   1. ĐA NGÔN NGỮ (VI / EN)
   ========================================================================== */
const i18nData = {
  vi: {
    top_dashboard: "Dashboard Sở Du Lịch",
    nav_home: "Trang chủ",
    nav_combo: "Combo Lịch Trình",
    nav_explore: "Khám phá & Bản đồ",
    nav_cuisine: "Ẩm thực",
    nav_stay: "Lưu trú",
    nav_events: "Sự kiện",
    nav_guide: "Cẩm nang",
    nav_partner: "Đối tác",
    nav_about: "Về Sở Du Lịch",
    cta_plan: "Lên Lịch Trình",
    hero_badge: "Cổng thông tin du lịch thông minh chính thống tỉnh Ninh Bình",
    hero_title: 'Chạm Vào Kỳ Quan <br><span class="gradient-text">Non Nước Ninh Bình</span>',
    hero_desc: "Hệ thống gợi ý lịch trình thông minh đầu tiên tại Việt Nam, tối ưu tuyến đường, chi phí thực tế và kết nối trực tiếp đối tác dịch vụ lữ hành uy tín.",
    search_time: "Thời gian",
    search_budget: "Ngân sách/Người",
    search_style: "Trải nghiệm",
    search_pax: "Số người",
    btn_find_combo: "Tìm Combo Ngay"
  },
  en: {
    top_dashboard: "Tourism Department Dashboard",
    nav_home: "Home",
    nav_combo: "Smart Combos",
    nav_explore: "Explore & GIS Map",
    nav_cuisine: "Cuisine",
    nav_stay: "Stay",
    nav_events: "Events & Festivals",
    nav_guide: "Travel Guide",
    nav_partner: "Partners",
    nav_about: "Tourism Board",
    cta_plan: "Plan My Trip",
    hero_badge: "Official Smart Tourism Portal of Ninh Binh Province",
    hero_title: 'Discover The Wonders of <br><span class="gradient-text">Ninh Binh Heritage</span>',
    hero_desc: "Vietnam's first smart itinerary builder. Optimize travel routes, real budgets, and connect with certified local travel partners.",
    search_time: "Duration",
    search_budget: "Budget/Person",
    search_style: "Experience",
    search_pax: "Travelers",
    btn_find_combo: "Find Combos"
  }
};

let currentLang = 'vi';

function initLanguage() {
  const btnVi = document.getElementById('langVi');
  const btnEn = document.getElementById('langEn');

  btnVi.addEventListener('click', () => setLanguage('vi'));
  btnEn.addEventListener('click', () => setLanguage('en'));
}

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('langVi').classList.toggle('active', lang === 'vi');
  document.getElementById('langEn').classList.toggle('active', lang === 'en');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nData[lang][key]) {
      el.innerHTML = i18nData[lang][key];
    }
  });

  showToast(lang === 'vi' ? 'Đã chuyển sang Tiếng Việt' : 'Switched to English');
}

/* ==========================================================================
   2. BẢN ĐỒ DU LỊCH SỐ TƯƠNG TÁC (LEAFLET GIS MAP)
   ========================================================================== */
const POI_DATA = [
  {
    id: 1,
    name: "Quần thể Danh thắng Tràng An",
    category: "nature",
    catLabel: "Thiên nhiên & Hang động",
    coords: [20.2539, 105.9083],
    img: "https://images.unsplash.com/photo-1557750255-c76072a7aad1?auto=format&fit=crop&w=400&q=80",
    rating: "4.9 ★ (18.5k đánh giá)",
    desc: "Di sản Thế giới Kép UNESCO với hệ thống hang động xuyên thủy và núi đá vôi triệu năm tuổi.",
    tagColor: "nature"
  },
  {
    id: 2,
    name: "Quần thể Chùa Bái Đính",
    category: "spiritual",
    catLabel: "Tâm linh",
    coords: [20.2683, 105.8569],
    img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80",
    rating: "4.8 ★ (12.2k đánh giá)",
    desc: "Ngôi đại tự nắm giữ nhiều kỷ lục Châu Á nhất với 500 tượng La Hán bằng đá xanh nguyên khối.",
    tagColor: "spiritual"
  },
  {
    id: 3,
    name: "Tam Cốc – Bích Động",
    category: "nature",
    catLabel: "Thiên nhiên & Sinh thái",
    coords: [20.2154, 105.9348],
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
    rating: "4.8 ★ (9.8k đánh giá)",
    desc: "'Nam thiên đệ nhị động' nổi tiếng với dòng sông Ngô Đồng uốn lượn qua cánh đồng lúa vàng.",
    tagColor: "nature"
  },
  {
    id: 4,
    name: "Hang Múa (Đỉnh Ngọa Long)",
    category: "caves",
    catLabel: "Hang động & Check-in",
    coords: [20.2315, 105.9372],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    rating: "4.9 ★ (15.1k đánh giá)",
    desc: "486 bậc thang đá dẫn lên đỉnh núi ngắm trọn vẹn thung lũng Tam Cốc từ trên cao.",
    tagColor: "nature"
  },
  {
    id: 5,
    name: "Cố Đô Hoa Lư",
    category: "heritage",
    catLabel: "Di tích Lịch sử",
    coords: [20.2858, 105.9067],
    img: "https://images.unsplash.com/photo-1685345414207-5f9c292fd7ff?auto=format&fit=crop&w=400&q=80",
    rating: "4.7 ★ (8.1k đánh giá)",
    desc: "Kinh đô đầu tiên của nhà nước Đại Cồ Việt thời vua Đinh Tiên Hoàng và vua Lê Đại Hành.",
    tagColor: "heritage"
  },
  {
    id: 6,
    name: "Vườn Quốc Gia Cúc Phương",
    category: "nature",
    catLabel: "Thiên nhiên & Rừng nguyên sinh",
    coords: [20.3167, 105.6167],
    img: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=400&q=80",
    rating: "4.8 ★ (7.3k đánh giá)",
    desc: "Vườn quốc gia đầu tiên tại Việt Nam, cây chò ngàn năm và mùa bướm trắng bay ngập lối.",
    tagColor: "nature"
  },
  {
    id: 7,
    name: "Khu Bảo Tồn Đầm Vân Long",
    category: "nature",
    catLabel: "Khu ngập nước sinh thái",
    coords: [20.3541, 105.8647],
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80",
    rating: "4.7 ★ (4.2k đánh giá)",
    desc: "'Vịnh không sóng' với mặt nước phẳng như gương và là nơi bảo tồn đàn voọc mông trắng quý hiếm.",
    tagColor: "nature"
  },
  {
    id: 8,
    name: "Phố Cổ Hoa Lư Về Đêm",
    category: "heritage",
    catLabel: "Văn hóa & Đêm",
    coords: [20.2550, 105.9750],
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
    rating: "4.8 ★ (6.5k đánh giá)",
    desc: "Không gian đèn lồng truyền thống bên hồ Kỳ Lân lung linh, biểu diễn nghệ thuật cổ truyền.",
    tagColor: "heritage"
  },
  {
    id: 9,
    name: "Thung Nham (Vườn Chim)",
    category: "caves",
    catLabel: "Hang động & Sinh thái",
    coords: [20.1983, 105.9231],
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    rating: "4.6 ★ (3.9k đánh giá)",
    desc: "Khu sinh thái với hang Bụt, động Vái Giời và bãi đỗ của hàng ngàn cá thể chim hoàng hôn.",
    tagColor: "nature"
  },
  {
    id: 10,
    name: "Làng Thêu Ren Cổ Văn Lâm",
    category: "craft",
    catLabel: "Làng nghề truyền thống",
    coords: [20.2180, 105.9400],
    img: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80",
    rating: "4.6 ★ (2.1k đánh giá)",
    desc: "Làng nghề thêu ren truyền thống hơn 700 năm tuổi ngay bến thuyền Tam Cốc.",
    tagColor: "craft"
  },
  {
    id: 11,
    name: "Làng Gốm Cổ Bồ Bát",
    category: "craft",
    catLabel: "Làng nghề gốm sứ",
    coords: [20.1650, 105.9800],
    img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=400&q=80",
    rating: "4.5 ★ (1.8k đánh giá)",
    desc: "Cội nguồn lịch sử của dòng gốm Bát Tràng trứ danh, trải nghiệm tự tay chuốt gốm.",
    tagColor: "craft"
  },
  {
    id: 12,
    name: "Nhà Hàng Dê Núi Chính Thư",
    category: "food",
    catLabel: "Ẩm thực đặc sản",
    coords: [20.2810, 105.9120],
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80",
    rating: "4.8 ★ (5.2k đánh giá)",
    desc: "Cơ sở ẩm thực dê núi 7 món chuẩn vị lâu đời nhất tại xã Ninh Xuân, Hoa Lư.",
    tagColor: "food"
  }
];

let mapInstance = null;
let mapMarkers = [];
let routePolyline = null;

function initLeafletMap() {
  const mapEl = document.getElementById('leafletMap');
  if (!mapEl) return;

  // Center on Ninh Binh province
  mapInstance = L.map('leafletMap', {
    center: [20.25, 105.93],
    zoom: 11,
    zoomControl: true
  });

  // OpenStreetMap Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Sở Du Lịch Ninh Bình',
    maxZoom: 18
  }).addTo(mapInstance);

  // Render initial POIs
  renderPoiList(POI_DATA);
  renderMapMarkers(POI_DATA);

  // Draw Sample Itinerary Route Polyline
  const sampleRouteCoords = [
    [20.2858, 105.9067], // Cố Đô Hoa Lư
    [20.2810, 105.9120], // Dê Chính Thư
    [20.2539, 105.9083], // Tràng An
    [20.2550, 105.9750], // Phố Cổ Hoa Lư
    [20.2315, 105.9372], // Hang Múa
    [20.2683, 105.8569]  // Chùa Bái Đính
  ];

  routePolyline = L.polyline(sampleRouteCoords, {
    color: '#0d9488',
    weight: 4,
    opacity: 0.8,
    dashArray: '8, 8',
    lineCap: 'round'
  }).addTo(mapInstance);

  // Setup category filter tabs
  const filterTabs = document.querySelectorAll('#poiFilterTabs .tab-chip');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-category');
      filterPois(cat);
    });
  });

  // Setup Search Input
  const searchInput = document.getElementById('poiSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = POI_DATA.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
      renderPoiList(filtered);
      renderMapMarkers(filtered);
    });
  }
}

function filterPois(category) {
  const filtered = category === 'all' 
    ? POI_DATA 
    : POI_DATA.filter(p => p.category === category);

  renderPoiList(filtered);
  renderMapMarkers(filtered);
}

function renderPoiList(pois) {
  const container = document.getElementById('poiItemsContainer');
  if (!container) return;

  container.innerHTML = '';
  if (pois.length === 0) {
    container.innerHTML = '<div style="padding: 1rem; color: #64748b; font-size: 0.85rem;">Không tìm thấy địa điểm phù hợp.</div>';
    return;
  }

  pois.forEach(poi => {
    const card = document.createElement('div');
    card.className = 'poi-card-item';
    card.setAttribute('data-id', poi.id);
    card.innerHTML = `
      <img src="${poi.img}" alt="${poi.name}" class="poi-thumb" loading="lazy">
      <div class="poi-meta">
        <span class="poi-type">${poi.catLabel}</span>
        <h5>${poi.name}</h5>
        <span class="poi-rating">${poi.rating}</span>
      </div>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.poi-card-item').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      mapInstance.flyTo(poi.coords, 14, { duration: 1.2 });
      
      const targetMarker = mapMarkers.find(m => m._poiId === poi.id);
      if (targetMarker) targetMarker.openPopup();
    });

    container.appendChild(card);
  });
}

function renderMapMarkers(pois) {
  if (!mapInstance) return;

  // Clear existing markers
  mapMarkers.forEach(m => mapInstance.removeLayer(m));
  mapMarkers = [];

  pois.forEach(poi => {
    // Determine pin color
    let pinColor = '#0d9488';
    if (poi.category === 'spiritual') pinColor = '#d97706';
    if (poi.category === 'heritage') pinColor = '#4f46e5';
    if (poi.category === 'food') pinColor = '#ef4444';

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="
        background: ${pinColor};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 2.5px solid #ffffff;
        box-shadow: 0 4px 10px rgba(0,0,0,0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 14px;">
        <i class="fa-solid fa-location-dot"></i>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const marker = L.marker(poi.coords, { icon: customIcon }).addTo(mapInstance);
    marker._poiId = poi.id;

    const popupHtml = `
      <div class="map-popup-card">
        <img src="${poi.img}" alt="${poi.name}">
        <div class="popup-info">
          <span style="font-size: 0.7rem; font-weight: 700; color: ${pinColor}; text-transform: uppercase;">${poi.catLabel}</span>
          <h5>${poi.name}</h5>
          <p>${poi.desc}</p>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.75rem; color: #d97706; font-weight: 700;">${poi.rating}</span>
            <button onclick="addPoiToItinerary('${poi.name}')" style="background: #0d9488; color: #fff; border: none; padding: 4px 10px; border-radius: 4px; font-size: 0.72rem; cursor: pointer;">
              + Thêm vào Lịch Trình
            </button>
          </div>
        </div>
      </div>
    `;

    marker.bindPopup(popupHtml);
    mapMarkers.push(marker);
  });
}

// Global hook to add POI to itinerary from map popup
window.addPoiToItinerary = function(poiName) {
  showToast(`Đã thêm "${poiName}" vào kế hoạch tùy chỉnh combo!`);
  const slotList = document.getElementById('day1Slots');
  if (slotList) {
    const newSlot = document.createElement('div');
    newSlot.className = 'slot-item';
    newSlot.innerHTML = `
      <span class="slot-time"><i class="fa-regular fa-clock"></i> 16:45 - 18:00</span>
      <div class="slot-content">
        <h5>${poiName}</h5>
        <p>Điểm tham quan thêm từ bản đồ du lịch số.</p>
      </div>
      <span class="slot-tag-badge tag-highlight">Mới thêm</span>
      <button class="btn-remove-slot" title="Bỏ điểm này"><i class="fa-solid fa-xmark"></i></button>
    `;
    slotList.appendChild(newSlot);
    bindRemoveSlotButtons();
    calculateEstimatedCost();
  }
};

/* ==========================================================================
   3. TÍNH NĂNG TRỌNG TÂM: TRÌNH TẠO & TÙY BIẾN COMBO (4 BƯỚC WIZARD)
   ========================================================================== */
const COMBO_DETAILS = {
  combo1: {
    name: "Ninh Bình Trong Ngày: Tam Cốc – Chùa Bái Đính",
    duration: "1 Ngày (8h - 18h)",
    pax: "2 Người",
    baseTickets: 300000,
    baseHotel: 0,
    baseMeals: 200000,
    baseTransport: 180000
  },
  combo2: {
    name: "Khám Phá Di Sản Tràng An – Cố Đô Hoa Lư (2N1Đ)",
    duration: "2 Ngày 1 Đêm",
    pax: "2 Người",
    baseTickets: 500000,
    baseHotel: 450000,
    baseMeals: 450000,
    baseTransport: 500000
  },
  combo3: {
    name: "Ninh Bình Hoang Sơ: Vườn Cúc Phương – Bản Mường (3N2Đ)",
    duration: "3 Ngày 2 Đêm",
    pax: "2 Người",
    baseTickets: 650000,
    baseHotel: 900000,
    baseMeals: 750000,
    baseTransport: 550000
  },
  combo4: {
    name: "Ninh Binh Heritage & Culture (For International Travelers)",
    duration: "2 Ngày 1 Đêm",
    pax: "2 Người",
    baseTickets: 600000,
    baseHotel: 700000,
    baseMeals: 500000,
    baseTransport: 400000
  }
};

let currentSelectedComboId = 'combo2';

function initComboWizard() {
  // Step 1: Radio and checkbox pill selectors
  setupPillSelection('optDuration');
  setupPillSelection('optAudience');
  setupPillSelection('optBudget');
  setupCheckboxSelection('optPreferences');

  // Hero Quick Search Button connects directly to Step 2
  const btnQuickSearch = document.getElementById('btnQuickSearch');
  if (btnQuickSearch) {
    btnQuickSearch.addEventListener('click', () => {
      goToWizardStep(2);
      const comboSection = document.getElementById('combo-section');
      if (comboSection) comboSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Seasonal chips link to search
  document.querySelectorAll('.season-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.season-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      goToWizardStep(2);
      showToast(`Đã lọc Combo theo ${chip.innerText.trim()}!`);
    });
  });

  // Step 1 -> Step 2
  const btnProceedToStep2 = document.getElementById('btnProceedToStep2');
  if (btnProceedToStep2) {
    btnProceedToStep2.addEventListener('click', () => {
      goToWizardStep(2);
    });
  }

  // Step 2 -> Back to Step 1
  const btnBackToStep1 = document.getElementById('btnBackToStep1');
  if (btnBackToStep1) {
    btnBackToStep1.addEventListener('click', () => {
      goToWizardStep(1);
    });
  }

  // Step 2: Select Combo Cards
  document.querySelectorAll('.btn-select-combo').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const comboId = e.currentTarget.getAttribute('data-id');
      currentSelectedComboId = comboId;
      loadComboIntoStep3(comboId);
      goToWizardStep(3);
    });
  });

  // Step 3 -> Back to Step 2
  const btnBackToStep2 = document.getElementById('btnBackToStep2');
  if (btnBackToStep2) {
    btnBackToStep2.addEventListener('click', () => {
      goToWizardStep(2);
    });
  }

  // Step 3 -> Step 4
  const btnProceedToStep4 = document.getElementById('btnProceedToStep4');
  if (btnProceedToStep4) {
    btnProceedToStep4.addEventListener('click', () => {
      finalizeStep4Preview();
      goToWizardStep(4);
    });
  }

  // Step 4 -> Back to Step 3
  const btnBackToStep3 = document.getElementById('btnBackToStep3');
  if (btnBackToStep3) {
    btnBackToStep3.addEventListener('click', () => {
      goToWizardStep(3);
    });
  }

  // Customizer inputs change event: Recalculate cost
  const hotelSelect = document.getElementById('selectHotelChoice');
  const transportSelect = document.getElementById('selectTransportChoice');
  const chkGuide = document.getElementById('chkGuide');
  const chkInsurance = document.getElementById('chkInsurance');

  if (hotelSelect) hotelSelect.addEventListener('change', calculateEstimatedCost);
  if (transportSelect) transportSelect.addEventListener('change', calculateEstimatedCost);
  if (chkGuide) chkGuide.addEventListener('change', calculateEstimatedCost);
  if (chkInsurance) chkInsurance.addEventListener('change', calculateEstimatedCost);

  // Add Stop Buttons in Step 3
  const btnAddStopDay1 = document.getElementById('btnAddStopDay1');
  if (btnAddStopDay1) {
    btnAddStopDay1.addEventListener('click', () => {
      promptAddExtraStop('day1Slots');
    });
  }

  const btnAddStopDay2 = document.getElementById('btnAddStopDay2');
  if (btnAddStopDay2) {
    btnAddStopDay2.addEventListener('click', () => {
      promptAddExtraStop('day2Slots');
    });
  }

  // Bind remove slot actions
  bindRemoveSlotButtons();

  // Step 4 Actions: Print PDF, Save to Trips, Connect Partner
  const btnPrintPDF = document.getElementById('btnPrintPDF');
  if (btnPrintPDF) {
    btnPrintPDF.addEventListener('click', () => {
      window.print();
    });
  }

  const btnSaveToMyTrips = document.getElementById('btnSaveToMyTrips');
  if (btnSaveToMyTrips) {
    btnSaveToMyTrips.addEventListener('click', () => {
      const countEl = document.getElementById('savedCount');
      if (countEl) {
        let cnt = parseInt(countEl.innerText) || 0;
        countEl.innerText = cnt + 1;
      }
      showToast('Đã lưu Combo Lịch trình vào tài khoản cá nhân thành công!');
    });
  }

  const btnConnectPartnerModal = document.getElementById('btnConnectPartnerModal');
  if (btnConnectPartnerModal) {
    btnConnectPartnerModal.addEventListener('click', () => {
      openModal('bookingConnectModal');
    });
  }
}

function setupPillSelection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const buttons = container.querySelectorAll('.pill-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

function setupCheckboxSelection(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const buttons = container.querySelectorAll('.pill-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
    });
  });
}

function goToWizardStep(stepNum) {
  // Update indicator
  for (let i = 1; i <= 4; i++) {
    const ind = document.getElementById(`stepIndicator${i}`);
    const pane = document.getElementById(`stepPane${i}`);
    const conn = document.getElementById(`connector${i}`);

    if (ind) {
      ind.classList.toggle('active', i === stepNum);
      ind.classList.toggle('completed', i < stepNum);
    }
    if (pane) {
      pane.classList.toggle('active', i === stepNum);
    }
    if (conn) {
      conn.classList.toggle('active', i < stepNum);
    }
  }

  // Scroll smoothly to wizard top
  const wizardTop = document.getElementById('combo-section');
  if (wizardTop) {
    wizardTop.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function loadComboIntoStep3(comboId) {
  const combo = COMBO_DETAILS[comboId];
  if (!combo) return;

  const titleEl = document.getElementById('currentEditingComboName');
  if (titleEl) titleEl.innerText = combo.name;

  // Booking modal title
  const bookingComboTitle = document.getElementById('bookingComboTitle');
  if (bookingComboTitle) bookingComboTitle.innerText = `Combo: ${combo.name}`;

  calculateEstimatedCost();
}

function bindRemoveSlotButtons() {
  document.querySelectorAll('.btn-remove-slot').forEach(btn => {
    btn.onclick = (e) => {
      const slot = e.currentTarget.closest('.slot-item');
      if (slot) {
        slot.style.opacity = '0';
        slot.style.transform = 'scale(0.9)';
        setTimeout(() => {
          slot.remove();
          calculateEstimatedCost();
          showToast('Đã xóa điểm dừng khỏi lịch trình');
        }, 200);
      }
    };
  });
}

function promptAddExtraStop(containerId) {
  const extraStops = [
    { title: "Ngắm hoàng hôn Đầm Vân Long", desc: "Du thuyền nan ngắm mặt nước phẳng lặng như gương.", time: "16:30 - 18:00", tag: "Sinh thái" },
    { title: "Trải nghiệm làm gốm Bồ Bát", desc: "Tự tay nặn chiếc bình gốm mang về làm kỷ niệm.", time: "14:00 - 15:30", tag: "Làng nghề" },
    { title: "Thưởng thức Trà sen Cố Đô", desc: "Thưởng trà ướp sen tự nhiên bên hồ Kỳ Lân.", time: "17:00 - 18:00", tag: "Ẩm thực" }
  ];

  const pick = extraStops[Math.floor(Math.random() * extraStops.length)];
  const container = document.getElementById(containerId);
  if (container) {
    const newSlot = document.createElement('div');
    newSlot.className = 'slot-item';
    newSlot.innerHTML = `
      <span class="slot-time"><i class="fa-regular fa-clock"></i> ${pick.time}</span>
      <div class="slot-content">
        <h5>${pick.title}</h5>
        <p>${pick.desc}</p>
      </div>
      <span class="slot-tag-badge tag-highlight">${pick.tag}</span>
      <button class="btn-remove-slot" title="Bỏ điểm này"><i class="fa-solid fa-xmark"></i></button>
    `;
    container.appendChild(newSlot);
    bindRemoveSlotButtons();
    calculateEstimatedCost();
    showToast(`Đã thêm điểm dừng: ${pick.title}`);
  }
}

function calculateEstimatedCost() {
  const combo = COMBO_DETAILS[currentSelectedComboId] || COMBO_DETAILS.combo2;
  
  // Hotel option
  const hotelSelect = document.getElementById('selectHotelChoice');
  let hotelCost = 450000;
  if (hotelSelect) {
    if (hotelSelect.value === 'hotel3') hotelCost = 650000;
    if (hotelSelect.value === 'resort5') hotelCost = 1750000;
    if (combo.baseHotel === 0) hotelCost = 0; // Combo trong ngày
  }

  // Transport option
  const transportSelect = document.getElementById('selectTransportChoice');
  let transportCost = 500000;
  if (transportSelect) {
    if (transportSelect.value === 'bike') transportCost = 150000;
    if (transportSelect.value === 'limo') transportCost = 700000;
  }

  // Add-ons
  const chkGuide = document.getElementById('chkGuide');
  const chkInsurance = document.getElementById('chkInsurance');
  let extraCost = 0;
  if (chkGuide && chkGuide.checked) extraCost += 200000;
  if (chkInsurance && chkInsurance.checked) extraCost += 30000;

  const ticketsCost = combo.baseTickets;
  const mealsCost = combo.baseMeals;

  const total = ticketsCost + hotelCost + transportCost + mealsCost + extraCost;

  // Format currency
  const fmt = (num) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

  if (document.getElementById('costTickets')) document.getElementById('costTickets').innerText = fmt(ticketsCost);
  if (document.getElementById('costHotel')) document.getElementById('costHotel').innerText = fmt(hotelCost);
  if (document.getElementById('costTransport')) document.getElementById('costTransport').innerText = fmt(transportCost);
  if (document.getElementById('costMeals')) document.getElementById('costMeals').innerText = fmt(mealsCost);
  if (document.getElementById('costExtra')) document.getElementById('costExtra').innerText = fmt(extraCost);
  if (document.getElementById('totalEstimatedCost')) document.getElementById('totalEstimatedCost').innerText = fmt(total);

  // Update in step 4 preview
  if (document.getElementById('dispFinalTotal')) document.getElementById('dispFinalTotal').innerText = fmt(total);
  if (document.getElementById('bookingModalPrice')) document.getElementById('bookingModalPrice').innerText = `${fmt(total)} / khách`;
}

function finalizeStep4Preview() {
  const hotelSelect = document.getElementById('selectHotelChoice');
  const stayTypeEl = document.getElementById('dispStayType');
  if (hotelSelect && stayTypeEl) {
    const text = hotelSelect.options[hotelSelect.selectedIndex].text.split('(')[0].trim();
    stayTypeEl.innerText = text;
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString('vi-VN');
  const curDateSpan = document.getElementById('currentDateSpan');
  if (curDateSpan) curDateSpan.innerText = dateStr;
}

/* ==========================================================================
   4. TRỢ LÝ ẢO AI CHATBOT DU LỊCH THÔNG MINH
   ========================================================================== */
const AI_RESPONSES = {
  "tràng an hay tam cốc": `Dạ, cả hai đều tuyệt đẹp nhưng có nét riêng:
<br>• <strong>Tràng An:</strong> Di sản Thế giới Kép, quần thể hang động xuyên thủy hùng vĩ, chèo thuyền 3 tiếng, quy mô lớn và chuyên nghiệp.
<br>• <strong>Tam Cốc:</strong> Dòng sông Ngô Đồng thơ mộng, nổi bật nhất vào mùa lúa chín tháng 5 - 6, lái đò chèo bằng chân độc đáo.
<br>👉 <em>Lời khuyên:</em> Nếu đi lần đầu hoặc đi cùng gia đình/người cao tuổi, bạn nên ưu tiên <strong>Tràng An Tuyến 2 hoặc 3</strong> nhé!`,

  "lịch trình 2 ngày 1 đêm cho gia đình": `Tuyệt vời! Sở Du lịch gợi ý lịch trình 2N1Đ chuẩn nhất cho gia đình có trẻ nhỏ/người lớn tuổi:
<br>• <strong>Ngày 1:</strong> Đón tại Hà Nội &rarr; Cố Đô Hoa Lư &rarr; Ăn trưa dê núi Chính Thư &rarr; Đi thuyền Tràng An Tuyến 3 &rarr; Tối dạo Phố Cổ Hoa Lư thả hoa đăng.
<br>• <strong>Ngày 2:</strong> Check-in Hang Múa đón bình minh &rarr; Chiêm bái Chùa Bái Đính &rarr; Mua đặc sản cơm cháy &rarr; Chiều về lại Hà Nội.
<br>👉 Chi phí dự kiến chỉ từ <strong>1.650.000đ/người</strong>!`,

  "dê núi": `Ẩm thực dê núi Ninh Bình nổi tiếng nhờ dê thả leo trên núi đá vôi nên thịt rất săn chắc và thơm.
<br>Các món nhất định phải thử:
<br>1. Dê tái chanh cuốn chuối chát & tương gừng
<br>2. Dê nướng tảng thơm lừng
<br>3. Cơm cháy sốt tim cật dê cay nóng
<br>📍 <strong>Địa chỉ uy tín:</strong> Nhà hàng Chính Thư (Hoa Lư), Nhà hàng Hoàng Giang (Tràng An), Nhà hàng Dê Thăng Long.`,

  "chi phí": `Mức chi phí du lịch Ninh Bình trung bình:
<br>• Đi trong ngày (1N): ~600.000 - 800.000 ₫/người.
<br>• Tour 2 ngày 1 đêm (2N1Đ): ~1.600.000 - 2.200.000 ₫/người (đã gồm phòng nghỉ + vé thuyền + xe đưa đón).
<br>• Nghỉ dưỡng resort 5 sao: ~3.500.000 ₫+/người.`,

  "default": `Cảm ơn bạn đã hỏi! Tôi có thể hỗ trợ bạn tìm kiếm điểm đến, tư vấn lựa chọn giữa các tuyến thuyền Tràng An/Tam Cốc, tính toán chi phí tour hoặc kết nối bạn với đối tác lữ hành của Sở Du Lịch Ninh Bình. Bạn cần thông tin gì thêm nữa không?`
};

function initAiChatbot() {
  const btnToggleChat = document.getElementById('btnToggleChat');
  const btnCloseChat = document.getElementById('btnCloseChat');
  const aiChatBox = document.getElementById('aiChatBox');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiChatBody = document.getElementById('aiChatBody');
  const footerChatTrigger = document.getElementById('footerOpenAiChat');

  if (btnToggleChat && aiChatBox) {
    btnToggleChat.addEventListener('click', () => {
      aiChatBox.classList.toggle('active');
      if (aiChatBox.classList.contains('active')) {
        setTimeout(() => aiChatInput.focus(), 200);
      }
    });
  }

  if (btnCloseChat && aiChatBox) {
    btnCloseChat.addEventListener('click', () => {
      aiChatBox.classList.remove('active');
    });
  }

  if (footerChatTrigger && aiChatBox) {
    footerChatTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      aiChatBox.classList.add('active');
      setTimeout(() => aiChatInput.focus(), 200);
    });
  }

  // Quick prompt chips
  document.querySelectorAll('.ai-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      sendUserChatMessage(q);
    });
  });

  // Handle Form Submit
  if (aiChatForm) {
    aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = aiChatInput.value.trim();
      if (!text) return;
      sendUserChatMessage(text);
      aiChatInput.value = '';
    });
  }

  function sendUserChatMessage(text) {
    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-msg user-msg';
    userMsg.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
    aiChatBody.appendChild(userMsg);
    aiChatBody.scrollTop = aiChatBody.scrollHeight;

    // Simulate typing and reply
    const lower = text.toLowerCase();
    let replyText = AI_RESPONSES.default;

    if (lower.includes('tràng an') || lower.includes('tam cốc')) {
      replyText = AI_RESPONSES["tràng an hay tam cốc"];
    } else if (lower.includes('2 ngày') || lower.includes('2n1đ') || lower.includes('gia đình') || lower.includes('lịch trình')) {
      replyText = AI_RESPONSES["lịch trình 2 ngày 1 đêm cho gia đình"];
    } else if (lower.includes('dê') || lower.includes('cơm cháy') || lower.includes('ăn')) {
      replyText = AI_RESPONSES["dê núi"];
    } else if (lower.includes('giá') || lower.includes('chi phí') || lower.includes('tiền')) {
      replyText = AI_RESPONSES["chi phí"];
    }

    setTimeout(() => {
      const aiMsg = document.createElement('div');
      aiMsg.className = 'chat-msg ai-msg';
      aiMsg.innerHTML = `<div class="msg-bubble">${replyText}</div>`;
      aiChatBody.appendChild(aiMsg);
      aiChatBody.scrollTop = aiChatBody.scrollHeight;
    }, 500);
  }
}

/* ==========================================================================
   5. QUẢN LÝ MODALS (DASHBOARD, ĐỐI TÁC, BOOKING, REVIEW)
   ========================================================================== */
function initModals() {
  // Open Dashboard Modal
  const btnOpenDashboard = document.getElementById('btnOpenDashboard');
  const footerOpenCMS = document.getElementById('footerOpenCMS');
  if (btnOpenDashboard) btnOpenDashboard.addEventListener('click', () => openModal('dashboardModal'));
  if (footerOpenCMS) footerOpenCMS.addEventListener('click', (e) => { e.preventDefault(); openModal('dashboardModal'); });

  // Open Partner Modal
  const btnOpenPartner = document.getElementById('btnOpenPartnerModal');
  const footerPartnerRegister = document.getElementById('footerPartnerRegister');
  if (btnOpenPartner) btnOpenPartner.addEventListener('click', () => openModal('partnerModal'));
  if (footerPartnerRegister) footerPartnerRegister.addEventListener('click', (e) => { e.preventDefault(); openModal('partnerModal'); });

  // Open Review Modal
  const btnOpenReview = document.getElementById('btnOpenReviewModal');
  if (btnOpenReview) btnOpenReview.addEventListener('click', () => openModal('reviewModal'));

  // Close modals
  document.querySelectorAll('.btn-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close');
      closeModal(modalId);
    });
  });

  // Close when click backdrop
  document.querySelectorAll('.modal-backdrop').forEach(bd => {
    bd.addEventListener('click', (e) => {
      if (e.target === bd) {
        bd.classList.remove('active');
      }
    });
  });

  // Partner Registration Form
  const partnerRegForm = document.getElementById('partnerRegForm');
  if (partnerRegForm) {
    partnerRegForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('partnerModal');
      showToast('Hồ sơ của bạn đã được gửi tới Sở Du Lịch. Bộ phận thẩm định sẽ phản hồi trong 24h!');
      partnerRegForm.reset();
    });
  }

  // Booking Connect Form
  const bookingConnectForm = document.getElementById('bookingConnectForm');
  if (bookingConnectForm) {
    bookingConnectForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('bookingConnectModal');
      showToast('Đã kết nối yêu cầu của bạn tới Đơn vị Lữ hành được Sở Du Lịch bảo chứng! Chuyên viên sẽ gọi tư vấn trong 15 phút.');
      bookingConnectForm.reset();
    });
  }

  // Set default booking date to tomorrow
  const bookingDateInput = document.getElementById('bookingDateInput');
  if (bookingDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    bookingDateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // Review Form & Star Rating
  const reviewStars = document.querySelectorAll('.star-opt');
  const starLabel = document.getElementById('starRatingLabel');
  reviewStars.forEach(star => {
    star.addEventListener('click', () => {
      const r = parseInt(star.getAttribute('data-rating'));
      reviewStars.forEach((s, idx) => {
        s.classList.toggle('active', idx < r);
      });
      const labels = ["Tạm được", "Hài lòng", "Khá tốt", "Rất tốt", "Tuyệt vời (5/5 sao)"];
      if (starLabel) starLabel.innerText = labels[r - 1] || '5/5 sao';
    });
  });

  const reviewSubmitForm = document.getElementById('reviewSubmitForm');
  if (reviewSubmitForm) {
    reviewSubmitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('reviewModal');
      showToast('Cảm ơn bạn! Đánh giá đã được gửi tới Sở Du Lịch để duyệt trước khi công khai.');
      reviewSubmitForm.reset();
    });
  }

  // Dashboard CMS Approve Button
  const btnApprove = document.querySelector('.btn-approve');
  if (btnApprove) {
    btnApprove.addEventListener('click', () => {
      btnApprove.innerText = 'Đã duyệt';
      btnApprove.classList.remove('btn-approve');
      btnApprove.disabled = true;
      showToast('Đã phê duyệt đánh giá của du khách lên Cổng thông tin!');
    });
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   6. MOBILE MENU & TOAST NOTIFICATION UTILS
   ========================================================================== */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close mobile menu on link click
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #10b981;"></i> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

function escapeHtml(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* ==========================================================================
   7. HERO DYNAMIC BACKGROUND SLIDESHOW
   ========================================================================== */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('#heroSlideshow .hero-slide');
  const dots = document.querySelectorAll('#heroDots .hero-dot');
  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function startTimer() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.currentTarget.getAttribute('data-slide'), 10);
      if (!isNaN(targetIndex)) {
        goToSlide(targetIndex);
        startTimer();
      }
    });
  });

  startTimer();
}

