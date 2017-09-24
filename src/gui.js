import DAT from 'dat-gui';
import {RepeatWrapping, NearestFilter, LinearFilter, LinearMipMapLinearFilter, Color, Fog} from 'three';

let json = `{
  "closed": false,
  "preset": "blue-fronted-parrot",
  "remembered": {
    "blue-fronted-parrot": {
      "0": {
        "num": 239,
        "spread": 0.1,
        "angle": 137.41,
        "growth": 0.12,
        "angle_open": 0,
        "starting_angle_open": 88.3368569415081,
        "growth_regular": false,
        "strategy": "normal",
        "crown_z": 10,
        "crown_growth": 0.12,
        "crown_spread": 1.05,
        "crown_scale": 0.5565912923408463,
        "crown_phistart": 2.5616226195767364,
        "crown_philength": 2.197251585623679,
        "crown_amplitude": 3.1968800697900877,
        "crown_freq": 0.4247357293868922,
        "crown_xoffset": 6.180163755253829,
        "crown_yoffset": 17.3515355915118,
        "crown_segment": 38.04203727946584,
        "crown_segment_length": 1.9914349429095444,
        "crown_length": 14.613300261712828,
        "petals_from": 116.10077519379846,
        "petals_scale": 0.6657761665962659,
        "petals_phistart": 1.0088090204369276,
        "petals_philength": 1.1,
        "petals_amplitude": 0.9,
        "petals_freq": 0.9930232558139535,
        "petals_xoffset": 11.767341260081672,
        "petals_yoffset": 24.03030303030303,
        "petals_segment": 10,
        "petals_segment_length": 2.420507399577167,
        "petals_length": 15.786469344608879,
        "sec_petals_from": 72.93798449612403,
        "sec_petals_scale": 0.5168877017025119,
        "sec_petals_phistart": 1.2884425651867513,
        "sec_petals_philength": 1.057297685390953,
        "sec_petals_amplitude": 1.3616918802848506,
        "sec_petals_freq": 0.8035940803382664,
        "sec_petals_xoffset": 15,
        "sec_petals_yoffset": 19.33967582804792,
        "sec_petals_segment": 13.31552333192532,
        "sec_petals_segment_length": 2.641508104298802,
        "sec_petals_length": 14.873150105708245,
        "crown_mat_color": "#007791",
        "crown_mat_emissive": "#000000",
        "crown_mat_shininess": 0,
        "crown_mat_map": "grayblue",
        "crown_mat_alpha": 0.35,
        "petal_one_mat_color": "#b6a2a2",
        "petal_one_mat_emissive": "#090909",
        "petal_one_mat_shininess": 0.8,
        "petal_one_mat_map": "red",
        "petal_one_mat_alpha": 0.8933307893625253,
        "petal_two_mat_color": "#3c660d",
        "petal_two_mat_emissive": "#282828",
        "petal_two_mat_shininess": 0.8,
        "petal_two_mat_map": "greenlight",
        "petal_two_mat_alpha": 0.4742373326245505,
        "petal_three_mat_color": "#707070",
        "petal_three_mat_emissive": "#111111",
        "petal_three_mat_shininess": 0.8,
        "petal_three_mat_map": "greenblack",
        "petal_three_mat_alpha": 0.35,
        "petal_four_mat_color": "#4d4d12",
        "petal_four_mat_emissive": "#343434",
        "petal_four_mat_shininess": 0.8,
        "petal_four_mat_map": "yellow",
        "petal_four_mat_alpha": 0.35
      }
    }
  },
  "folders": {
    "General": {
      "preset": "Default",
      "closed": true,
      "folders": {}
    },
    "Crown": {
      "preset": "Default",
      "closed": true,
      "folders": {}
    },
    "First Petal": {
      "preset": "Default",
      "closed": true,
      "folders": {}
    },
    "Second Petal": {
      "preset": "Default",
      "closed": true,
      "folders": {}
    },
    "crown_mat": {
      "preset": "Default",
      "closed": true,
      "folders": {}
    },
    "petal_one_mat": {
      "preset": "Default",
      "closed": false,
      "folders": {}
    },
    "petal_two_mat": {
      "preset": "Default",
      "closed": true,
      "folders": {}
    },
    "petal_three_mat": {
      "preset": "Default",
      "closed": false,
      "folders": {}
    },
    "petal_four_mat": {
      "preset": "Default",
      "closed": true,
      "folders": {}
    }
  }
}`;

export default class Gui extends DAT.GUI{
    constructor(regenerateCallbak, materials, textures){
        super(
            {
                load: JSON.parse(json)
                //load: JSON
            }
        );

        //console.log(JSON.parse(blueFronted));


        this.materials = materials;
        this.regenerate = regenerateCallbak;
        this.params = {
            material: "crown",
            angle:137.5,
            num:10,
            spread: 0.1,
            growth: 0.12,
            growth_regular: false,
            angle_open: 36.17438258159361,
            starting_angle_open: 47,
            strategy: "none",

            background: 0xFF0000,

            crown_z: 0.5,
            crown_growth: 0.12,
            crown_spread: 0.12,

            crown_scale:2.0,
            crown_segment: 10,
            crown_segment_length: 2,
            crown_length: 20,
            crown_phistart: 1.0,
            crown_philength: 1.1,
            crown_amplitude: 0.9,
            crown_freq: 0.2,
            crown_xoffset: 1.6,
            crown_yoffset: 1.6,

            crown_mat_color: 0xFF0000,
            crown_mat_emissive: 0x00FF00,
            crown_mat_shininess: 0.2,
            crown_mat_map: "none",
            crown_mat_alpha: 0.35,

            petals_from: 49,
            petals_scale:2.0,
            petals_segment: 10,
            petals_segment_length: 2,
            petals_length: 20,
            petals_phistart: 1.0,
            petals_philength: 1.1,
            petals_amplitude: 0.9,
            petals_freq: 0.2,
            petals_xoffset: 1.6,
            petals_yoffset: 1.6,

            sec_petals_from: 49,
            sec_petals_scale:2.0,
            sec_petals_segment: 10,
            sec_petals_segment_length: 2,
            sec_petals_length: 20,
            sec_petals_phistart: 1.0,
            sec_petals_philength: 1.1,
            sec_petals_amplitude: 0.9,
            sec_petals_freq: 0.2,
            sec_petals_xoffset: 1.6,
            sec_petals_yoffset: 1.6,

            petal_one_mat_color: 0xFF0000,
            petal_one_mat_emissive: 0x00FF00,
            petal_one_mat_shininess: 0.8,
            petal_one_mat_map: "none",
            petal_one_mat_alpha: 0.35,

            petal_two_mat_color: 0xFF0000,
            petal_two_mat_emissive: 0x00FF00,
            petal_two_mat_shininess: 0.8,
            petal_two_mat_map: "none",
            petal_two_mat_alpha: 0.35,

            petal_three_mat_color: 0xFF0000,
            petal_three_mat_emissive: 0x00FF00,
            petal_three_mat_shininess: 0.8,
            petal_three_mat_map: "none",
            petal_three_mat_alpha: 0.35,

            petal_four_mat_color: 0xFF0000,
            petal_four_mat_emissive: 0x00FF00,
            petal_four_mat_shininess: 0.8,
            petal_four_mat_map: "none",
            petal_four_mat_alpha: 0.35,

            petal_five_mat_color: 0xFF0000,
            petal_five_mat_emissive: 0x00FF00,
            petal_five_mat_shininess: 0.8,
            petal_five_mat_map: "none",
            petal_five_mat_alpha: 0.35

        };
        this.remember(this.params);

        let generalFolder = this.addFolder("General");
        let crownFolder = this.addFolder("Crown");
        let petalFolder = this.addFolder("First Petal");
        let secPetalFolder = this.addFolder("Second Petal");

        generalFolder.add(this.params, "num").min(1).max(800).step(1).onChange(this.regenerate);
        generalFolder.add(this.params, "spread").min(0).max(0.7).step(0.1).onChange(this.regenerate);
        generalFolder.add(this.params, "angle").min(132.0).max(138.0).step(0.01).onChange(this.regenerate);
        generalFolder.add(this.params, "growth").min(0.04).max(0.25).step(0.01).onChange(this.regenerate);
        generalFolder.add(this.params, "angle_open").min(0).max(80).onChange(this.regenerate);
        generalFolder.add(this.params, "starting_angle_open").min(50).max(100).onChange(this.regenerate);
        generalFolder.add(this.params, "growth_regular").onChange(this.regenerate);
        generalFolder.add(this.params, "strategy",["none", "normal", "radius", "angle"]).onChange(this.regenerate);

        crownFolder.add(this.params, "crown_z").min(-20).max(10.0).step(0.1).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_growth").min(0.0).max(0.25).step(0.01).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_spread").min(0.0).max(1.7).step(0.01).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_scale").min(0.1).max(1.0).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_phistart").min(0.1).max(6.3).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_philength").min(0.1).max(6.3).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_amplitude").min(0.1).max(10.5).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_freq").min(0.1).max(2.5).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_xoffset").min(0.1).max(15).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_yoffset").min(-7.0).max(25).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_segment").min(2).max(40).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_segment_length").min(0.1).max(5.0).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_length").min(3).max(30).onChange(this.regenerate);

        petalFolder.add(this.params, "petals_from").min(1).max(320).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_scale").min(0.1).max(1.0).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_phistart").min(0.1).max(6.3).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_philength").min(0.1).max(6.3).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_amplitude").min(0.1).max(10.5).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_freq").min(0.1).max(2.5).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_xoffset").min(0.1).max(15).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_yoffset").min(-7.0).max(25).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_segment").min(2).max(40).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_segment_length").min(0.1).max(5.0).onChange(this.regenerate);
        petalFolder.add(this.params, "petals_length").min(3).max(30).onChange(this.regenerate);

        secPetalFolder.add(this.params, "sec_petals_from").min(1).max(320).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_scale").min(0.1).max(1.0).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_phistart").min(0.1).max(6.3).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_philength").min(0.1).max(6.3).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_amplitude").min(0.1).max(10.5).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_freq").min(0.1).max(2.5).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_xoffset").min(0.1).max(15).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_yoffset").min(-7.0).max(25).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_segment").min(2).max(40).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_segment_length").min(0.1).max(5.0).onChange(this.regenerate);
        secPetalFolder.add(this.params, "sec_petals_length").min(3).max(30).onChange(this.regenerate);


        this._addTextures(textures);
        this._addStandardMaterial(materials["crown"], 'crown_mat');
        this._addStandardMaterial(materials["petal_one"], 'petal_one_mat');
        this._addStandardMaterial(materials["petal_two"], 'petal_two_mat');
        this._addStandardMaterial(materials["petal_three"], 'petal_three_mat');
        this._addStandardMaterial(materials["petal_four"], 'petal_four_mat');

        this.addTexturesToMaterial(materials, 'blue-fronted-parrot',json, textures);
    }

    addTexturesToMaterial(materials, bird, json, textures){
        let preset = JSON.parse(json)["remembered"][bird][0];
        for (var mat in materials) {
            let par = this._getMatParameter(preset, mat);
            materials[mat].color = new Color().setHex( par.color );
            materials[mat].emissive = new Color().setHex( par.emissive );
            materials[mat].shininess = par.shininess;
            this._setTexture(par.map, materials[mat], "map", textures);
        }
    }

    _getMatParameter(json, mat_string){
        let emissive = json[`${mat_string}_mat_emissive`];
        let color = json[`${mat_string}_mat_color`];
        return {
            emissive: (typeof emissive === "string") ? emissive.replace('#', '0x') : emissive,
            color: (typeof color === "string") ? color.replace('#', '0x') : color,
            shininess:json[`${mat_string}_mat_shininess`],
            map:json[`${mat_string}_mat_map`]
        };
    }

    hide(){
        DAT.GUI.toggleHide();
    }

    // credtis to these methods goes to Greg Tatum https://threejs.org/docs/scenes/js/material.js
    _addTextures(texMap){
        this.textureMaps = texMap;
        this.textureMapKeys = this._getObjectsKeys( this.textureMaps );
    }

    _handleColorChange ( color ) {
	      return function ( value ){
		        if (typeof value === "string") {
			          value = value.replace('#', '0x');
		        }
		        color.setHex( value );
        };
    }

    _updateMaterialFolder(){
	      return ( material ) => {
            if (!this.materials){
                console.log(
                    "If you want to edit the materials in the GUI, you have to add them using gui.addMaterials"
                );
                return;
            };

            this._addStandardMaterial(this.materials[material], material);
        };
    }

    _removeFolder(name) {
        let folder = this.__folders[name];
        if (!folder) {
            return;
        }
        folder.close();
        this.__ul.removeChild(folder.domElement.parentNode);
        delete this.__folders[name];
        this.onResize();
    }

    _addStandardMaterial (material, material_string) {
        //this._removeFolder("Material");
        var folder = this.addFolder(material_string);
        let color_field = material_string + '_color';
        let emissive_field = material_string + '_emissive';
        let shininess_field = material_string + '_shininess';
        let alpha_field = material_string + '_alpha';
        let map_field = material_string + '_map';

        folder.addColor( this.params, color_field ).onChange( this._handleColorChange( material.color ) );
        folder.addColor( this.params, emissive_field ).onChange( this._handleColorChange( material.emissive ) );
        folder.add( this.params, shininess_field, 0, 1).onChange( (val) => { material.shininess = val; } );
        //debugger
        folder.add( this.params, map_field, this.textureMapKeys ).onChange( this._updateTexture( material, 'map', this.textureMaps ) );
        folder.add( this.params, alpha_field, 0, 1).onChange( (val) => {
            if (material.alphaMap != null) {
                material.alphaTest = val;
		            material.needsUpdate = true;
            }
        });
    }

    _updateTexture ( material, materialKey, textures ) {
        console.log(textures);
	      return ( key ) => {
            this._setTexture(key, material, materialKey, textures);
	      };
    }

    _setTexture(key, material, materialKey, textures){
		    material[materialKey] = textures[key];
        if( key!= "none") {
            material[materialKey].magFilter = LinearFilter;
            material[materialKey].minFilter = LinearMipMapLinearFilter;
            material[materialKey].anisotropy = 1;
            material.alphaTest = 0.50;
            material.alphaMap = textures[key+'_alpha'];
            material.normalMap = textures[key+'_nrm'];
            material.specularMap = textures[key+'_spec'];
            material.alphaMap.wrapT = RepeatWrapping;
            material.alphaMap.wrapS = RepeatWrapping;
            //material.alphaMap.repeat.y = 1;
        } else {
            material.alphaMap = null;
        }
		    material.needsUpdate = true;
    }

    _getObjectsKeys( obj ) {
	      var keys = [];
	      for ( var key in obj ) {
		        if ( obj.hasOwnProperty( key ) ) {
			          keys.push( key );
		        }
	      }
	      return keys;
    }
}
