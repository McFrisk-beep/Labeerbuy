<div class="kdl-cct-fullbanner">
  <div class="hp_banner">
    <div class="hp_img_bg">
      <img class="kdl-animate img-in-view kdl-cctheroimg-desktop" src="{{bannerimage}}">
    </div>
    <div class="hp_banner_container {{alignment}}">
      <div class="hp_banner_text">
        <h1 class="kd-heading-4">{{{header}}}</h1>
        <br>
        <div>
        <p class="kd-cct-fb-paragraph">{{{paragraph}}}</p>
        </div>
        <br>
        <a href="{{linkurl}}" class="cta">{{linklabel}}</a>
      </div>
    </div>
  </div>
</div>



<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->