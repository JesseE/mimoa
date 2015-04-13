/**
 * Created by jesse on 18/03/15.
 */
App.info({name:'MIMOA'});
App.icons({
    'android_ldpi': 'public/images/mimoa-icon.png',
    'android_mdpi': 'public/images/mimoa-icon.png',
    'android_hdpi': 'public/images/mimoa-icon.png',
    'android_xhdpi': 'public/images/mimoa-icon.png'
});
App.launchScreens({'android_ldpi_portrait': 'public/images/launchscreen.png',
    'android_ldpi_landscape': 'public/images/launchscreen.png',
    'android_mdpi_portrait': 'public/images/launchscreen.png',
    'android_mdpi_landscape': 'public/images/launchscreen.png',
    'android_hdpi_portrait': 'public/images/launchscreen.png',
    'android_hdpi_landscape': 'public/images/launchscreen.png',
    'android_xhdpi_portrait': 'public/images/launchscreen.png',
    'android_xhdpi_landscape': 'public/images/launchscreen.png'});
App.accessRule('*');
App.accessRule('*.google.com/*');
App.accessRule('*.googleapis.com/*');
App.accessRule('*.gstatic.com/*');
