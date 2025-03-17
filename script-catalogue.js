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

            // Modal pour chaque voiture
            carsHTML += `
                <div class="modal fade" id="modal-${car.id}" tabindex="-1" aria-labelledby="detailsLabel-${car.id}" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="detailsLabel-${car.id}">${car.name}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" id="modal-body-${car.id}">
                                <!-- Contenu dynamique -->
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        carsHTML += '</div>';
        document.getElementById('mainContent').innerHTML = carsHTML;

		/** ---------------- CONTENU DES MODALS ---------------- **/
		cars.forEach(car => {
			let voiture = "";  // Initialisation de la variable voiture

			// Correspondance des ids des voitures avec leurs noms
			if (car.id === 101) {
				voiture = "ferrari-sf90-stradale";
			} else if (car.id === 102) {
				voiture = "lamborghini-huracan-evo";
			} else if (car.id === 103) {
				voiture = "porsche-911-turbo-s";
			} else if (car.id === 104) {
				voiture = "aston-martin-dbs";
			} else if (car.id === 105) {
				voiture = "bugatti-chiron-super-sport";
			} else if (car.id === 106) {
				voiture = "mclaren-765lt";
			} else if (car.id === 107) {
				voiture = "koenigsegg-jesko";
			} else if (car.id === 108) {
				voiture = "mercedes-amg-one";
			}

			// Accès aux détails spécifiques de la voiture
			const carDetails = data.pagesContent.carDetails[voiture];
			const modalBody = document.getElementById(`modal-body-${car.id}`);

			let contentHTML = `
				<p><strong>Prix :</strong> ${car.price} €</p>
				<p><strong>Marque :</strong> ${car.brand}</p>
			`;

			if (carDetails) {
				contentHTML += `
					<p><strong>Introduction :</strong> ${carDetails.introduction}</p>
					<p><strong>Description longue :</strong> ${carDetails.descriptionLongue}</p>
					<p><strong>Spécifications :</strong></p>
					<ul>
				`;

				for (const [specName, specValue] of Object.entries(carDetails.specs)) {
					contentHTML += `<li><strong>${specName}:</strong> ${specValue}</li>`;
				}

				contentHTML += `</ul><p><strong>Galerie :</strong></p><div class="gallery">`;

				carDetails.gallery.forEach(image => {
					contentHTML += `<img src="${image}" class="img-fluid mb-3" alt="Photo de ${car.name}">`;
				});

				contentHTML += `</div>`;
			} else {
				contentHTML += `<p>Détails non disponibles pour cette voiture.</p>`;
			}

			modalBody.innerHTML = contentHTML;
		});

    })
    .catch(error => {
        console.error('Erreur lors du chargement du contenu:', error);
    });
