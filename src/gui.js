import DAT from 'dat-gui';
import {RepeatWrapping, NearestFilter, LinearFilter, LinearMipMapLinearFilter, Color, Fog} from 'three';

export default class Gui extends DAT.GUI{
    constructor(regenerateCallbak, materials, textures){
        super(
            {
                load: JSON
            }
        );

        this.materials = materials;
        this.regenerate = regenerateCallbak;
        this.params = {
            material: "crown",
            angle:137.5,
            num:53,
            spread: 0.1,
            growth: 0.12,
            growth_regular: false,
            angle_open: 36.17438258159361,
            starting_angle_open: 47,

            background: 0xFF0000,

            crown_size:4,
            crown_z: 0.5,
            crown_growth: 0.12,
            crown_spread: 0.12,

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

            crown_mat_color: 0xFF0000,
            crown_mat_emissive: 0x00FF00,
            crown_mat_shininess: 0.2,
            crown_mat_map: "none",
            crown_mat_alpha: 0.35,


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

        let petalFolder = this.addFolder("First Petal");
        let crownFolder = this.addFolder("Crown Folder");
        let generalFolder = this.addFolder("General");

        generalFolder.add(this.params, "num").min(1).max(800).step(1).onChange(this.regenerate);
        generalFolder.add(this.params, "spread").min(0).max(0.7).step(0.1).onChange(this.regenerate);
        generalFolder.add(this.params, "angle").min(132.0).max(138.0).step(0.01).onChange(this.regenerate);
        generalFolder.add(this.params, "growth").min(0.04).max(0.25).step(0.01).onChange(this.regenerate);
        generalFolder.add(this.params, "angle_open").min(0).max(80).onChange(this.regenerate);
        generalFolder.add(this.params, "starting_angle_open").min(50).max(100).onChange(this.regenerate);
        generalFolder.add(this.params, "growth_regular").onChange(this.regenerate);

        crownFolder.add(this.params, "crown_size").min(0.1).max(4).step(0.1).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_z").min(-10).max(10.0).step(0.1).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_growth").min(0.0).max(0.25).step(0.01).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_spread").min(0.0).max(1.7).step(0.01).onChange(this.regenerate);

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

        this._addTextures(textures);
        this._addStandardMaterial(materials["crown"], 'crown_mat');
        this._addStandardMaterial(materials["petal_one"], 'petal_one_mat');
        this._addStandardMaterial(materials["petal_two"], 'petal_two_mat');
        this._addStandardMaterial(materials["petal_three"], 'petal_three_mat');
        this._addStandardMaterial(materials["petal_four"], 'petal_four_mat');
        //this._addStandardMaterial(materials["petal_five"], 'petal_five_mat');
    }

    // credtis to these methods goes to Greg Tatum https://threejs.org/docs/scenes/js/material.js
    addScene ( scene, renderer ) {
	      let folder = this.addFolder('Scene');
	      let color = new Color();
	      let colorConvert = this._handleColorChange( color );

	      folder.addColor( this.params, "background" ).onChange( function ( value ) {
		        colorConvert( value );
		        renderer.setClearColor( color.getHex() );

	      } );
	      this.guiSceneFog( folder, scene );
    }

    // credtis to these methods goes to Greg Tatum https://threejs.org/docs/scenes/js/material.js
    _addTextures(texMap){
        this.textureMaps = texMap;
        this.textureMapKeys = this._getObjectsKeys( this.textureMaps );
    }

    guiSceneFog ( folder, scene ) {
	      let fogFolder = folder.addFolder('scene.fog');
	      let fog = new Fog( 0x3f7b9d, 0, 60 );
	      let data = {
		        fog : {
			          "THREE.Fog()" : false,
			          "scene.fog.color" : fog.color.getHex()
		        }
	      };

	      fogFolder.add( data.fog, 'THREE.Fog()' ).onChange( function ( useFog ) {
		        if ( useFog ) {
			          scene.fog = fog;
		        } else {
			          scene.fog = null;
		        }
	      } );
	      fogFolder.addColor( data.fog, 'scene.fog.color').onChange( this._handleColorChange( fog.color ) );
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
		        material[materialKey] = textures[key];
            if( key!= "none") {
                material[materialKey].magFilter = LinearFilter;
                material[materialKey].minFilter = LinearMipMapLinearFilter;
                material[materialKey].anisotropy = 1;
                material.alphaTest = 0.50;
                material.alphaMap = textures[key+'_alpha'];
                material.normalMap = textures[key+'_nrm'];
                material.specularMap = textures[key+'_spec'];
                //material.alphaMap.magFilter = LinearFilter;
                //material.alphaMap.minFilter = LinearMipMapLinearFilter;
                material.alphaMap.wrapT = RepeatWrapping;
                material.alphaMap.wrapS = RepeatWrapping;
                //material.alphaMap.repeat.y = 1;
            } else {
                material.alphaMap = null;
            }
		        material.needsUpdate = true;
	      };
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
