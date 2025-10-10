//Hamburger Menu Toggle Function
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

//Dropdown Menu Toggle Function
function toggleDropdown(event) {
    event.preventDefault();
    
    // Get the parent dropdown element
    const dropdownParent = event.target.closest('.dropdown');
    
    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        //On mobile, toggle the clicked dropdown
        dropdownParent.classList.toggle('active');
        
        //Close other dropdowns on mobile
        const allDropdowns = document.querySelectorAll('.dropdown');
        allDropdowns.forEach(dropdown => {
            if (dropdown !== dropdownParent) {
                dropdown.classList.remove('active');
            }
        });
    } else {
        //On desktop, toggle on click (hover also works via CSS)
        dropdownParent.classList.toggle('active');
    }
}

//Close dropdowns when clicking outside
function closeDropdownsOnClickOutside(event) {
    const isDropdown = event.target.closest('.dropdown');
    
    if (!isDropdown) {
        const allDropdowns = document.querySelectorAll('.dropdown');
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

//Close dropdowns when window is resized
function handleResize() {
    const allDropdowns = document.querySelectorAll('.dropdown');
    allDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

//Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    //Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    //Dropdown toggle functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleDropdown);
    });
    
    //Close dropdowns when clicking outside
    document.addEventListener('click', closeDropdownsOnClickOutside);
    
    //Close dropdowns on window resize
    window.addEventListener('resize', handleResize);
    
    //Prevent dropdown links from bubbling up to document click
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        menu.addEventListener('click', function(event) {
            //Allow links to work but stop propagation
            if (event.target.tagName === 'A') {
                //Let the link work normally (navigate to page)
                return;
            }
            event.stopPropagation();
        });
    });
    
    //Run initial viewport check
    checkViewport();
    
    //Log weapon database info on page load
    console.log('=== Steyr Arms Database Initialized ===');
    console.log(`Total weapons in database: ${weaponDatabase.getTotalWeapons()}`);
    console.log('Categories loaded:', firearmsCategories.length);
});

//Array Example: List of Steyr firearms categories
const firearmsCategories = [
    'Assault Rifles',
    'Precision Rifles',
    'SMGs',
    'Pistols',
    '40mm Grenade Launchers'
];

//Loop Example: Display categories in console
console.log('Steyr Firearms Categories:');
for (let i = 0; i < firearmsCategories.length; i++) {
    console.log(`${i + 1}. ${firearmsCategories[i]}`);
}

//Conditional Example: Check viewport width and log device type
function checkViewport() {
    const width = window.innerWidth;
    let deviceType;
    
    if (width < 768) {
        deviceType = 'Mobile';
    } else if (width >= 768 && width < 1024) {
        deviceType = 'Tablet';
    } else {
        deviceType = 'Desktop';
    }
    
    console.log(`Current viewport: ${deviceType} (${width}px)`);
    return deviceType;
}

//Object & Methods Example: Weapon database with dropdown navigation
const weaponDatabase = {
    assaultRifles: [
        { name: 'Steyr AUG', url: 'aug.html', year: 1977 },
        { name: 'STM-556', url: 'stm-556.html', year: 2004 },
        { name: 'G62', url: 'g62.html', year: 2012 }
    ],
    precisionRifles: [
        { name: 'SSG 69', url: 'ssg-69.html', year: 1969 },
        { name: 'Scout', url: 'scout.html', year: 1998 },
        { name: 'SSG 04', url: 'ssg-04.html', year: 2004 },
        { name: 'SSG 08', url: 'ssg-08.html', year: 2008 },
        { name: 'DMR 762', url: 'dmr-762.html', year: 2016 },
        { name: 'HS .50', url: 'hs-50.html', year: 2004 }
    ],
    smgs: [
        { name: 'MPi 69', url: 'mpi-69.html', year: 1969 },
        { name: 'AUG Para', url: 'aug-para.html', year: 1988 },
        { name: 'TMP', url: 'tmp.html', year: 1993 }
    ],
    pistols: [
        { name: 'GB Series', url: 'gb.html', year: 1981 },
        { name: 'M Series', url: 'm-series.html', year: 1999 }
    ],
    grenadeLaunchers: [
        { name: 'GL 40', url: 'gl-40.html', year: 1970 }
    ],
    
    //Method to get all weapons in a category
    getWeaponsByCategory: function(category) {
        return this[category] || [];
    },
    
    //Method to get total weapon count
    getTotalWeapons: function() {
        return this.assaultRifles.length + 
               this.precisionRifles.length + 
               this.smgs.length + 
               this.pistols.length + 
               this.grenadeLaunchers.length;
    },
    
    //Method to search for a weapon by name
    searchWeapon: function(searchTerm) {
        const allWeapons = [
            ...this.assaultRifles,
            ...this.precisionRifles,
            ...this.smgs,
            ...this.pistols,
            ...this.grenadeLaunchers
        ];
        
        return allWeapons.filter(weapon => 
            weapon.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    },
    
    //Method to get weapons by year range
    getWeaponsByYearRange: function(startYear, endYear) {
        const allWeapons = [
            ...this.assaultRifles,
            ...this.precisionRifles,
            ...this.smgs,
            ...this.pistols,
            ...this.grenadeLaunchers
        ];
        
        return allWeapons.filter(weapon => 
            weapon.year >= startYear && weapon.year <= endYear
        );
    },
    
    //Method to get all weapon names
    getAllWeaponNames: function() {
        const allWeapons = [
            ...this.assaultRifles,
            ...this.precisionRifles,
            ...this.smgs,
            ...this.pistols,
            ...this.grenadeLaunchers
        ];
        
        return allWeapons.map(weapon => weapon.name);
    },
    
    //Method to get category statistics
    getCategoryStats: function() {
        return {
            'Assault Rifles': this.assaultRifles.length,
            'Precision Rifles': this.precisionRifles.length,
            'SMGs': this.smgs.length,
            'Pistols': this.pistols.length,
            'Grenade Launchers': this.grenadeLaunchers.length
        };
    }
};

//Run viewport check on window resize
window.addEventListener('resize', checkViewport);

//Log weapon database statistics
console.log('=== Weapon Database Statistics ===');
console.log('Category breakdown:', weaponDatabase.getCategoryStats());
console.log('All weapons:', weaponDatabase.getAllWeaponNames());
console.log('Assault Rifles:', weaponDatabase.getWeaponsByCategory('assaultRifles'));
console.log('Precision Rifles:', weaponDatabase.getWeaponsByCategory('precisionRifles'));