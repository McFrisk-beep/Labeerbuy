<section class="kdl-productslider-content">
  <h1>{{header}}</h1>
  <p>{{subheader}}</p>
  <ul  class="kdlpc-slider">
    {{#each items}}
      <li>
        <a href="{{_url}}" class="kdlpc-image hvr-float-shadow" data-touchpoing="home">
          <img class="" src="{{resizeImage _thumbnail.url 'thumbnail'}}" alt="">
        </a>
        <a href="{{_url}}" data-touchpoing="home">{{displayname}}</a>
      </li>
    {{/each}}
  </ul>
  <a href="{{linkurl}}" class="button-primary button-large">{{linklabel}}</a>
</section>

<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->