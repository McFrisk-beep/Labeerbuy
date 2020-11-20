<section class="ageverification-info-card"
style="text-align: center;
    position: absolute;
    left: 0;
    z-index: 1000;
    background: white;
    top: 0;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    display: flex;
    flex-direction: column;
    justify-content: center;">

	<h1>Welcome to La Beer Buy!</h1>

    <div class="ageverification-info-card-content">By entering this website, you agree that you're of legal drinking age which is 21 or older.</div>
    <div>
	    <span>
	    	<button class="btn btn-primary" type="submit" data-action="legal">Yes, I'm Legal</button>
	    </span>
	    <span>
		    <button class="btn btn-primary" type="submit" data-action="not-legal">Not Yet</button>
		</span>
	</div>

	<div style="
    background-image: url('https://p.weebly.com/132184546/a56fe3425d/ab4cb87d2ad4117cd3c82c63acdf2d50.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    opacity: 0.2;
    position: absolute;
    top: 0;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    z-index: -1;
    "></div>

</section>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->