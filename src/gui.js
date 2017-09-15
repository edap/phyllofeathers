import DAT from 'dat-gui';
import {Color, Fog} from 'three';

export default class Gui extends DAT.GUI{
    constructor(regenerateCallbak){
        super(
            {
                load: JSON,
                preset: 'Flow'
            }
        );

        this.regenerate = regenerateCallbak;
        this.params = {
            material: "standard",
            angle:137.5,
            num:53,
            spread: 0.1,
            growth: 0.12,

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

            growth_regular: false,
            angle_open: 36.17438258159361,
            starting_angle_open: 47
        };
        this.remember(this.params);

        let petalFolder = this.addFolder("First Petal");
        let crownFolder = this.addFolder("Crown Folder");

        this.add(this.params, "num").min(1).max(800).step(1).onChange(this.regenerate);

        this.add(this.params, "spread").min(0).max(0.7).step(0.1).onChange(this.regenerate);
        this.add(this.params, "angle").min(132.0).max(138.0).step(0.01).onChange(this.regenerate);
        this.add(this.params, "growth").min(0.04).max(0.25).step(0.01).onChange(this.regenerate);
        this.add(this.params, "angle_open").min(0).max(80).onChange(this.regenerate);
        this.add(this.params, "starting_angle_open").min(50).max(100).onChange(this.regenerate);
        this.add(this.params, "growth_regular").onChange(this.regenerate);
        this.add(this.params, "material", ["standard", "wireframe", "phong","lambert"]).onChange(this._updateMaterialFolder());

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


    }

    addMaterials(materials){
        this.materials = materials;
        this._addStandardMaterial(materials['standard']);
    }

    // credtis to these methods goes to Greg Tatum https://threejs.org/docs/scenes/js/material.js
    addScene ( scene, ambientLight, renderer ) {
	      let folder = this.addFolder('Scene');
	      let data = {
		        background : "#000000",
		        "ambient light" : ambientLight.color.getHex()
	      };

	      let color = new Color();
	      let colorConvert = this._handleColorChange( color );

	      folder.addColor( data, "background" ).onChange( function ( value ) {
		        colorConvert( value );
		        renderer.setClearColor( color.getHex() );

	      } );

	      folder.addColor( data, "ambient light" ).onChange( this._handleColorChange( ambientLight.color ) );
	      this.guiSceneFog( folder, scene );
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
            switch (material) {
                case "phong":
                    this._addPhongMaterial(this.materials[material]);
                    break;
                case "standard":
                    this._addStandardMaterial(this.materials[material]);
                    break;
                case "wireframe":
                    this._addMaterialColor(this.materials[material]);
                    break;
                case "lambert":
                    this._addLambertMaterial(this.materials[material]);
                    break;
                default:
                this._addMaterialColor(this.materials[material]);
            }
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

    _addPhongMaterial (material) {
        this._removeFolder("Material");
        var folder = this.addFolder('Material');
        var data = {
            color : material.color.getHex(),
            emissive : material.emissive.getHex(),
            specular : material.specular.getHex()
        };

        folder.addColor( data, 'color' ).onChange( this._handleColorChange( material.color ) );
        folder.addColor( data, 'emissive' ).onChange( this._handleColorChange( material.emissive ) );
        folder.addColor( data, 'specular' ).onChange( this._handleColorChange( material.specular ) );
        folder.add( material, 'shininess', 0, 100);
        folder.add( material, 'wireframe' );
        folder.add( material, 'wireframeLinewidth', 0, 10 );
        folder.add( material, 'fog' );
    }

    _addStandardMaterial (material) {
        this._removeFolder("Material");
        var folder = this.addFolder('Material');
        let data = {
            color : material.color.getHex(),
            emissive : material.emissive.getHex()
        };

        folder.addColor( data, 'color' ).onChange( this._handleColorChange( material.color ) );
        folder.addColor( data, 'emissive' ).onChange( this._handleColorChange( material.emissive ) );
        folder.add( material, 'roughness', 0, 1 );
        folder.add( material, 'metalness', 0, 1 );
        folder.add( material, 'wireframe' );
        folder.add( material, 'wireframeLinewidth', 0, 10 );
        folder.add( material, 'fog' );
    }
    _addLambertMaterial(material){
        this._removeFolder("Material");
        let folder = this.addFolder('Material');
        let data = {
            color : material.color.getHex(),
            emissive : material.emissive.getHex()
        };

        folder.addColor( data, 'color' ).onChange( this._handleColorChange( material.color ) );
        folder.addColor( data, 'emissive' ).onChange( this._handleColorChange( material.emissive ) );
        folder.add( material, 'wireframe' );
        folder.add( material, 'wireframeLinewidth', 0, 10 );
        folder.add( material, 'fog' );
        folder.add( material, 'reflectivity', 0, 1 );
        folder.add( material, 'refractionRatio', 0, 1 );
    }

    _addMaterialColor(material){
        this._removeFolder("Material");
        var folder = this.addFolder('Material');
        let data = {
            color : material.color.getHex()
        };
        folder.addColor( data, 'color' ).onChange( this._handleColorChange( material.color ) );
    }
}
