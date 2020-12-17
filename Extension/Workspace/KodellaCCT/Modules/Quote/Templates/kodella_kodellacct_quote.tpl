<div class="quoteDiv" style="{{#unless overlayimg}}background-color: {{overlaycolor}}{{/unless}}">
  {{#if overlayimg}}
    <div class="qd-bgimg" style="{{#if overlayimg}}background-image: url({{overlayimg}});{{/if}}"></div>
  {{/if}}
  <div class="quoteText">
    <h1 {{#if quoteTextColor}}style="color:{{quoteTextColor}};"{{/if}}>&#8220;{{quote}}&#8221;</h1>
    <h4 {{#if quoteTextColor}}style="color:{{quoteTextColor}};"{{/if}}>-</h4>
    <h4 {{#if quoteTextColor}}style="color:{{quoteTextColor}};"{{/if}}>{{author}}</h4>
    {{#if ctalink}}
      <a href="{{ctalink}}" class="button-primary button-large">{{ctabtn}}</a>
    {{/if}}
  </div>
</div>


<!--
  Available helpers:
  {{ getExtensionAssetsPath "img/image.jpg"}} - reference assets in your extension
  
  {{ getExtensionAssetsPathWithDefault context_var "img/image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the extension assets folder
  
  {{ getThemeAssetsPath context_var "img/image.jpg"}} - reference assets in the active theme
  
  {{ getThemeAssetsPathWithDefault context_var "img/theme-image.jpg"}} - use context_var value i.e. configuration variable. If it does not exist, fallback to an asset from the theme assets folder
-->