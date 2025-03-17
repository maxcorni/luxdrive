fetch('luxdrive_site_data_full.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

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
	
	/** ---------------- HERO BANNER ---------------- **/
	const hero = data.pagesContent.Accueil.heroBanner;
	let heroHTML = '';
	heroHTML += `
		<div class="position-relative text-white">
			<img src="${hero.image}" alt="Hero Banner" class="img-fluid w-100" style="object-fit: contain; height: full;">
			<div class="position-absolute top-50 start-50 translate-middle text-center bg-dark bg-opacity-50 p-4 rounded">
				<h1 class="display-4 fw-bold">${hero.title}</h1>
				<p class="lead">${hero.subtitle}</p>
				<a href="/pages/${navItems[1].url}.html" class="btn btn-secondary btn-lg">${hero.cta}</a>
			</div>
		</div>
	`;
	document.getElementById('heroBanner').innerHTML = heroHTML;

	/** ---------------- STATS SECTION ---------------- **/
	const stats = data.pagesContent.Accueil.stats;
	let statsHTML = '<div class="row text-center">';

	for (let i = 0; i < stats.length; i++) {
		statsHTML += `
			<div class="col-md-4 mb-4">
				<div class="card shadow h-100">
					<div class="card-body">
						<h2 class="counter display-4 fw-bold">${stats[i].value}</h2>
						<p class="text-muted">${stats[i].label}</p>
					</div>
				</div>
			</div>
		`;
	}
	statsHTML += '</div>';
	document.getElementById('statsSection').innerHTML = statsHTML;

	/** ---------------- TESTIMONIALS SECTION ---------------- **/
	const testimonials = data.testimonials;
	let testimonialsHTML = '';

	testimonialsHTML += '<h2 class="text-center mb-4 text-white">Ils parlent de nous</h2>';
	testimonialsHTML += '<div class="row g-4 justify-content-center">';

	for (let i = 0; i < testimonials.length; i++) {
		const stars = '⭐'.repeat(testimonials[i].note) + '☆'.repeat(5 - testimonials[i].note);

		testimonialsHTML += `
			<div class="col-md-4">
				<div class="card h-100 shadow-sm">
					<div class="card-body">
						<p class="mb-2">"${testimonials[i].message}"</p>
						<div class="d-flex justify-content-between align-items-center">
							<strong>${testimonials[i].name}</strong>
							<span class="text-warning">${stars}</span>
						</div>
					</div>
				</div>
			</div>
		`;
	}
	testimonialsHTML += '</div>';
	document.getElementById('testimonialsSection').innerHTML = testimonialsHTML;

  })
  .catch(function(error) {
    console.error('Erreur lors du chargement du contenu:', error);
  });
