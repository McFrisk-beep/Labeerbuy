<section class="ageverification-info-card">

	<div class="ageverification-box" style="">
		<h1>{{translate 'Hey Drunkie!'}}</h1>
		<h2>{{translate 'Welcome to LaBeerBuy'}}</h2>
        <div class="ageverification-info-card-content">{{translate "By entering this website, you agree that you're of legal drinking age which is 21 or older."}}</div>
        <div>
    	    <span>
    	    	<button class="button-primary button-large ageverification-legal" type="submit" data-action="legal">{{translate "Yes, I'm Legal"}}</button>
    	    </span>
    	    <span>
    		    <button class="button-primary button-large ageverification-not-legal" type="submit" data-action="not-legal">{{translate "Not Yet"}}</button>
    		</span>
    	</div>
    </div>
	<div class="ageverification-background" style="background-image: url({{getExtensionAssetsPath "img/beer-beach.jpg"}});"></div>

</section>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->