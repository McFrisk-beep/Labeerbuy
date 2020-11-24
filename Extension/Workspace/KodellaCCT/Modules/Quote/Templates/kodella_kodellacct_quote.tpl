<div class="quoteDiv">
  {{#if overlayimg}}
    <div class="qd-bgimg" style="background-image: url({{overlayimg}});"></div>
  {{/if}}
  <div class="quoteText">
    <h1>&#8220;{{quote}}&#8221;</h1>
    <h4>-</h4>
    <h4>{{author}}</h4>
  </div>
</div>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->