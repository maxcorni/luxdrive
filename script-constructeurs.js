fetch('../luxdrive_site_data_full.json')
    .then(response => response.json())
    .then(data => {
        /** ---------------- HEADER NAVIGATION ---------------- **/
        const navItems = data.navigation;
        const navLinksContainer = document.getElementById('navLinks');

        // Premier lien
        const firstNavItem = navItems[0];
        const firstLink = document.createElement('li');
        firstLink.classList.add('nav-item');
        firstLink.innerHTML = `<a class="nav-link" href="${firstNavItem.url}">${firstNavItem.label}</a>`;
        navLinksContainer.appendChild(firstLink);

        // Liens suivants
        for (let i = 1; i < navItems.length; i++) {
            const navItem = navItems[i];
            const linkItem = document.createElement('li');
            linkItem.classList.add('nav-item');
            linkItem.innerHTML = `<a class="nav-link" href="/pages/${navItem.url}.html">${navItem.label}</a>`;
            navLinksContainer.appendChild(linkItem);
        }

        /** ---------------- FOOTER NAVIGATION ---------------- **/
        const footerLinks = data.footer.links;
        const socials = data.footer.socials;

        const footerLinksContainer = document.getElementById('footerLinks');
        const socialsContainer = document.getElementById('socialsLinks');

        footerLinks.forEach(link => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${link.url}" class="text-white text-decoration-none">${link.label}</a>`;
            footerLinksContainer.appendChild(listItem);
        });

        if (socials.instagram) {
            const instagramLink = document.createElement('a');
            instagramLink.href = socials.instagram;
            instagramLink.classList.add('text-white', 'me-3');
            instagramLink.target = '_blank';
            instagramLink.innerHTML = `<i class="bi bi-instagram"></i> Instagram`;
            socialsContainer.appendChild(instagramLink);
        }

        if (socials.youtube) {
            const youtubeLink = document.createElement('a');
            youtubeLink.href = socials.youtube;
            youtubeLink.classList.add('text-white', 'me-3');
            youtubeLink.target = '_blank';
            youtubeLink.innerHTML = `<i class="bi bi-youtube"></i> YouTube`;
            socialsContainer.appendChild(youtubeLink);
        }

        if (socials.twitter) {
            const twitterLink = document.createElement('a');
            twitterLink.href = socials.twitter;
            twitterLink.classList.add('text-white');
            twitterLink.target = '_blank';
            twitterLink.innerHTML = `<i class="bi bi-twitter"></i> Twitter`;
            socialsContainer.appendChild(twitterLink);
        }

        /** ---------------- LISTE DES VOITURES ---------------- **/
        const cars = data.cars;
        let carsHTML = '<div class="row g-4 justify-content-center">';

        cars.forEach(car => {
            // Carte voiture
            carsHTML += `
                <div class="col-md-6">
                    <div class="card h-100 shadow-sm">
                        <img src="${car.image}" class="card-img-top" alt="Image de ${car.name}">
                        <div class="card-body">
                            <h5 class="card-title">${car.name}</h5>
                            <p class="card-text">Prix : ${car.price} €</p>
                            <p class="text-muted">Marque : ${car.brand}</p>
                            <button type="button" class="btn btn-secondary bg-red view-details" data-bs-toggle="modal" data-bs-target="#modal-${car.id}">
                                Voir détails
                            </button>
                        </div>
                    </div>
                </div>
            `;

        });

        carsHTML += '</div>';
        document.getElementById('mainContent').innerHTML = carsHTML;

    })
    .catch(error => {
        console.error('Erreur lors du chargement du contenu:', error);
    });
