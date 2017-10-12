import DAT from 'dat-gui';
import {RepeatWrapping, NearestFilter, LinearFilter, LinearMipMapLinearFilter, Color, Fog} from 'three';

let json = `{
  "closed": false,
  "preset": "blue-fronted-parrot",
  "remembered": {
    "blue-fronted-parrot": {
      "0": {
        "num": 677,
        "spread": 2.6,
        "angle": 133.62,
        "growth": 0.11,
        "angle_open": 36.17438258159361,
        "starting_angle_open": 50,
        "growth_regular": false,
        "strategy": "contour",
        "crown_phistart": 2.2881089951793214,
        "crown_philength": 3.2454066805702744,
        "crown_amplitude": 2.8527822842578563,
        "crown_freq": 0.1,
        "crown_xoffset": 0.1,
        "crown_yoffset": 1.8230201418521013,
        "crown_segment": 18.344644812781016,
        "crown_segment_length": 1.721229951065324,
        "crown_length": 10.742200174475219,
        "petals_from": 91.15926708949965,
        "petals_scale": 0.6,
        "petals_phistart": 6.3,
        "petals_philength": 3.2454066805702744,
        "petals_amplitude": 0.9,
        "petals_freq": 0.2,
        "petals_xoffset": 1.6,
        "petals_yoffset": 1.6,
        "petals_segment": 13.568710359408033,
        "petals_segment_length": 1.2602536997885836,
        "petals_length": 20.568838857462996,
        "sec_petals_from": 221.4652157945294,
        "sec_petals_scale": 1,
        "sec_petals_phistart": 1.3308113097883683,
        "sec_petals_philength": 1.8094601524838447,
        "sec_petals_amplitude": 3.1968800697900877,
        "sec_petals_freq": 0.28528342297889414,
        "sec_petals_xoffset": 0.7573150005679816,
        "sec_petals_yoffset": 9.234357061007866,
        "sec_petals_segment": 10,
        "sec_petals_segment_length": 2,
        "sec_petals_length": 6.573323157450101,
        "crown_mat_color": 8910839,
        "crown_mat_emissive": 0,
        "crown_mat_shininess": 0.2,
        "crown_mat_map": "fifth",
        "crown_mat_alpha": 0.35,
        "petal_one_mat_color": 16777215,
        "petal_one_mat_emissive": 0,
        "petal_one_mat_shininess": 0.8,
        "petal_one_mat_map": "second",
        "petal_one_mat_alpha": 0.35,
        "petal_two_mat_color": 10197401,
        "petal_two_mat_emissive": 0,
        "petal_two_mat_shininess": 0.8,
        "petal_two_mat_map": "fourth",
        "petal_two_mat_alpha": 0.35,
        "petal_three_mat_color": 10329501,
        "petal_three_mat_emissive": 0,
        "petal_three_mat_shininess": 0.8,
        "petal_three_mat_map": "third",
        "petal_three_mat_alpha": 0.35,
        "petal_four_mat_color": 11513261,
        "petal_four_mat_emissive": 1118481,
        "petal_four_mat_shininess": 0.8,
        "petal_four_mat_map": "first",
        "petal_four_mat_alpha": 0.35
      }
    },
    "ring-necked-parakeet": {
      "0": {
        "num": 1985,
        "spread": 5.300000000000001,
        "angle": 130.21,
        "growth": 0.14,
        "angle_open": 14.999134241148573,
        "starting_angle_open": 53.86007131206029,
        "growth_regular": false,
        "strategy": "contour",
        "crown_phistart": 4.681353208656703,
        "crown_philength": 1.3308113097883683,
        "crown_amplitude": 5.25968992248062,
        "crown_freq": 0.1,
        "crown_xoffset": 1.6,
        "crown_yoffset": 1.6,
        "crown_segment": 15.711064129668781,
        "crown_segment_length": 4.354263565891473,
        "crown_length": 8.175475687103594,
        "petals_from": 111.2326078972647,
        "petals_scale": 0.24888846489375424,
        "petals_phistart": 0.2367568121987076,
        "petals_philength": 2.7565186751233264,
        "petals_amplitude": 0.5587970473763093,
        "petals_freq": 0.1,
        "petals_xoffset": 1.9480620155038761,
        "petals_yoffset": -0.29450469219240283,
        "petals_segment": 7.448214937593673,
        "petals_segment_length": 1.451024959221103,
        "petals_length": 11.933307893625253,
        "sec_petals_from": 1150.5306553911205,
        "sec_petals_scale": 0.6479915433403806,
        "sec_petals_phistart": 2.2881089951793214,
        "sec_petals_philength": 2.4932442134773827,
        "sec_petals_amplitude": 1.9351881895052374,
        "sec_petals_freq": 0.1,
        "sec_petals_xoffset": 8.152108756957773,
        "sec_petals_yoffset": -0.6474254978664868,
        "sec_petals_segment": 29.241074687968364,
        "sec_petals_segment_length": 2.4778039282291417,
        "sec_petals_length": 30,
        "crown_mat_color": "#ffffff",
        "crown_mat_emissive": "#000000",
        "crown_mat_shininess": 0.2,
        "crown_mat_map": "fifth",
        "crown_mat_alpha": 0.35,
        "petal_one_mat_color": 16777215,
        "petal_one_mat_emissive": 0,
        "petal_one_mat_shininess": 0.8,
        "petal_one_mat_map": "fourth",
        "petal_one_mat_alpha": 0.35,
        "petal_two_mat_color": 16777215,
        "petal_two_mat_emissive": 0,
        "petal_two_mat_shininess": 0.8,
        "petal_two_mat_map": "third",
        "petal_two_mat_alpha": 0.35,
        "petal_three_mat_color": 16777215,
        "petal_three_mat_emissive": 0,
        "petal_three_mat_shininess": 0.8,
        "petal_three_mat_map": "second",
        "petal_three_mat_alpha": 0.35,
        "petal_four_mat_color": 16777215,
        "petal_four_mat_emissive": 0,
        "petal_four_mat_shininess": 0.8,
        "petal_four_mat_map": "first",
        "petal_four_mat_alpha": 0.35
      }
    },
    "eastern-rosella": {
      "0": {
        "num": 1302,
        "spread": 8.9,
        "angle": 131.64000000000001,
        "growth": 0.24,
        "angle_open": 14.999134241148573,
        "starting_angle_open": 53.86007131206029,
        "growth_regular": false,
        "strategy": "normal",
        "crown_phistart": 4.681353208656703,
        "crown_philength": 1.3308113097883683,
        "crown_amplitude": 5.25968992248062,
        "crown_freq": 0.1,
        "crown_xoffset": 1.6,
        "crown_yoffset": 1.6,
        "crown_segment": 15.711064129668781,
        "crown_segment_length": 4.354263565891473,
        "crown_length": 8.175475687103594,
        "petals_from": 226.39816772374914,
        "petals_scale": 0.32829564617042317,
        "petals_phistart": 0.44189203049676895,
        "petals_philength": 2.7667578378747977,
        "petals_amplitude": 1.5910904039730054,
        "petals_freq": 0.8940718127666891,
        "petals_xoffset": 6.83747875582181,
        "petals_yoffset": 0.7642577248298492,
        "petals_segment": 40,
        "petals_segment_length": 3.180336907024115,
        "petals_length": 19.377731138312964,
        "sec_petals_from": 564.4954193093728,
        "sec_petals_scale": 0.4275546227662592,
        "sec_petals_phistart": 3.108649868371567,
        "sec_petals_philength": 2.9718930561728594,
        "sec_petals_amplitude": 2.164586713193392,
        "sec_petals_freq": 0.33822154383000674,
        "sec_petals_xoffset": 7.823451256673783,
        "sec_petals_yoffset": -0.6474254978664868,
        "sec_petals_segment": 20.859205553208866,
        "sec_petals_segment_length": 2.4778039282291417,
        "sec_petals_length": 22.653277365975555,
        "crown_mat_color": "#ffffff",
        "crown_mat_emissive": "#020202",
        "crown_mat_shininess": 0.2,
        "crown_mat_map": "second",
        "crown_mat_alpha": 0.35,
        "petal_one_mat_color": 16777215,
        "petal_one_mat_emissive": "#000000",
        "petal_one_mat_shininess": 0.8,
        "petal_one_mat_map": "third",
        "petal_one_mat_alpha": 0.35,
        "petal_two_mat_color": 16250871,
        "petal_two_mat_emissive": "#000000",
        "petal_two_mat_shininess": 0.8,
        "petal_two_mat_map": "fourth",
        "petal_two_mat_alpha": 0.35,
        "petal_three_mat_color": 15790320,
        "petal_three_mat_emissive": "#000000",
        "petal_three_mat_shininess": 0.8,
        "petal_three_mat_map": "first",
        "petal_three_mat_alpha": 0.35,
        "petal_four_mat_color": 15132390,
        "petal_four_mat_emissive": 0,
        "petal_four_mat_shininess": 0.8,
        "petal_four_mat_map": "fifth",
        "petal_four_mat_alpha": 0.35
      }
    },
    "budgeridgar": {
      "0": {
        "num": 1809,
        "spread": 7.300000000000001,
        "angle": 134.31,
        "growth": 0.24,
        "angle_open": 14.999134241148573,
        "starting_angle_open": 53.86007131206029,
        "growth_regular": false,
        "strategy": "angle",
        "crown_phistart": 4.681353208656703,
        "crown_philength": 1.3308113097883683,
        "crown_amplitude": 5.25968992248062,
        "crown_freq": 0.1,
        "crown_xoffset": 1.6,
        "crown_yoffset": 1.6,
        "crown_segment": 15.711064129668781,
        "crown_segment_length": 4.354263565891473,
        "crown_length": 8.175475687103594,
        "petals_from": 111.2326078972647,
        "petals_scale": 0.32829564617042317,
        "petals_phistart": 0.44189203049676895,
        "petals_philength": 2.7667578378747977,
        "petals_amplitude": 0.1,
        "petals_freq": 1.1587624170222521,
        "petals_xoffset": 3.5509037529819034,
        "petals_yoffset": 2.5288617532002693,
        "petals_segment": 40,
        "petals_segment_length": 1.8293119478030122,
        "petals_length": 19.377731138312964,
        "sec_petals_from": 1,
        "sec_petals_scale": 0.4672582134045937,
        "sec_petals_phistart": 3.108649868371567,
        "sec_petals_philength": 2.9718930561728594,
        "sec_petals_amplitude": 1.5910904039730054,
        "sec_petals_freq": 0.33822154383000674,
        "sec_petals_xoffset": 7.823451256673783,
        "sec_petals_yoffset": -0.6474254978664868,
        "sec_petals_segment": 20.859205553208866,
        "sec_petals_segment_length": 2.4778039282291417,
        "sec_petals_length": 22.653277365975555,
        "crown_mat_color": "#fffcfc",
        "crown_mat_emissive": "#000000",
        "crown_mat_shininess": 0.2,
        "crown_mat_map": "fifth",
        "crown_mat_alpha": 0.35,
        "petal_one_mat_color": 16777215,
        "petal_one_mat_emissive": "#000000",
        "petal_one_mat_shininess": 0.8,
        "petal_one_mat_map": "fourth",
        "petal_one_mat_alpha": 0.35,
        "petal_two_mat_color": 16777215,
        "petal_two_mat_emissive": "#000000",
        "petal_two_mat_shininess": 0.8,
        "petal_two_mat_map": "second",
        "petal_two_mat_alpha": 0.35,
        "petal_three_mat_color": 16777215,
        "petal_three_mat_emissive": "#000000",
        "petal_three_mat_shininess": 0.8,
        "petal_three_mat_map": "third",
        "petal_three_mat_alpha": 0.35,
        "petal_four_mat_color": 16777215,
        "petal_four_mat_emissive": 0,
        "petal_four_mat_shininess": 0.8,
        "petal_four_mat_map": "first",
        "petal_four_mat_alpha": 0.35
      }
    },
    "fischers-lovebird": {
      "0": {
        "num": 370,
        "spread": 0.5,
        "angle": 136.04,
        "growth": 0.04,
        "angle_open": 6.314305849189569,
        "starting_angle_open": 50,
        "growth_regular": false,
        "strategy": "angle",
        "crown_phistart": 0.5194503171247358,
        "crown_philength": 1.0787174066243834,
        "crown_amplitude": 1.507188160676533,
        "crown_freq": 0.2623678646934461,
        "crown_xoffset": 3.9641296687808314,
        "crown_yoffset": 10.31923890063425,
        "crown_segment": 22.99506694855532,
        "crown_segment_length": 1.42600422832981,
        "crown_length": 10.915433403805498,
        "petals_from": 78.39994419439756,
        "petals_scale": 0.1,
        "petals_phistart": 0.9205408731922455,
        "petals_philength": 1.8094601524838447,
        "petals_amplitude": 0.788195571064464,
        "petals_freq": 0.1,
        "petals_xoffset": 5.522848754685848,
        "petals_yoffset": 18.410298008534053,
        "petals_segment": 19.182831726256968,
        "petals_segment_length": 1.8833529461718561,
        "petals_length": 13.422192542562794,
        "sec_petals_from": 212.09075689381154,
        "sec_petals_scale": 0.4672582134045937,
        "sec_petals_phistart": 0.7837840609935378,
        "sec_petals_philength": 1.3308113097883683,
        "sec_petals_amplitude": 0.6734963092203866,
        "sec_petals_freq": 0.2,
        "sec_petals_xoffset": 1.6,
        "sec_petals_yoffset": 6.410990615615194,
        "sec_petals_segment": 8.286401851069623,
        "sec_petals_segment_length": 2,
        "sec_petals_length": 5.977769297875084,
        "crown_mat_color": 16769693,
        "crown_mat_emissive": 0,
        "crown_mat_shininess": 0.2,
        "crown_mat_map": "third",
        "crown_mat_alpha": 0.35,
        "petal_one_mat_color": 9336438,
        "petal_one_mat_emissive": "#000000",
        "petal_one_mat_shininess": 0.8,
        "petal_one_mat_map": "first",
        "petal_one_mat_alpha": 0.35,
        "petal_two_mat_color": 13157820,
        "petal_two_mat_emissive": 0,
        "petal_two_mat_shininess": 0.8,
        "petal_two_mat_map": "fourth",
        "petal_two_mat_alpha": 0.35,
        "petal_three_mat_color": 8774627,
        "petal_three_mat_emissive": 0,
        "petal_three_mat_shininess": 0.8,
        "petal_three_mat_map": "second",
        "petal_three_mat_alpha": 0.35,
        "petal_four_mat_color": 3636996,
        "petal_four_mat_emissive": 2631720,
        "petal_four_mat_shininess": 0.8,
        "petal_four_mat_map": "fifth",
        "petal_four_mat_alpha": 0.35
      }
    }
  },
  "preset": "blue-fronted-parrot",
  "closed": false,
  "folders": {
    "General": {
      "preset": "blue-fronted-parrot",
      "closed": true,
      "folders": {}
    },
    "Crown": {
      "preset": "blue-fronted-parrot",
      "closed": true,
      "folders": {}
    },
    "First Petal": {
      "preset": "blue-fronted-parrot",
      "closed": true,
      "folders": {}
    },
    "Second Petal": {
      "preset": "blue-fronted-parrot",
      "closed": true,
      "folders": {}
    },
    "crown_mat": {
      "preset": "blue-fronted-parrot",
      "closed": true,
      "folders": {}
    },
    "petal_one_mat": {
      "preset": "blue-fronted-parrot",
      "closed": false,
      "folders": {}
    },
    "petal_two_mat": {
      "preset": "blue-fronted-parrot",
      "closed": true,
      "folders": {}
    },
    "petal_three_mat": {
      "preset": "blue-fronted-parrot",
      "closed": false,
      "folders": {}
    },
    "petal_four_mat": {
      "preset": "blue-fronted-parrot",
      "closed": true,
      "folders": {}
    }
  }
}`;

export default class Gui extends DAT.GUI{
    constructor(regenerateCallbak, materials, textures, max_anisotropy, parrot_type, debug = false){
        let config;
        if (debug) {
            config = {load:JSON};
        } else {
            let loadedJson = JSON.parse(json);
            loadedJson.preset = parrot_type;
            config = {load: loadedJson};
        }
        console.log(config);

        super(config);
        this.maxAnis = max_anisotropy;
        this.materials = materials;
        this.regenerate = regenerateCallbak;
        this.params = {
            material: "crown",
            angle:128,
            //angle:131.75,
            num:1,
            spread: 0.1,
            growth: 0.13,
            growth_regular: false,
            angle_open: 36.17438258159361,
            starting_angle_open: 47,
            strategy: "radius",

            background: 0xFF0000,
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

            petals_from: 10,
            petals_scale:0.6,
            petals_segment: 10,
            petals_segment_length: 2,
            petals_length: 20,
            petals_phistart: 1.0,
            petals_philength: 1.1,
            petals_amplitude: 0.9,
            petals_freq: 0.2,
            petals_xoffset: 1.6,
            petals_yoffset: 1.6,

            sec_petals_from: 25,
            sec_petals_scale:1.0,
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

        generalFolder.add(this.params, "num").min(1).max(2000).step(1).onChange(this.regenerate);
        generalFolder.add(this.params, "spread").min(0).max(13.7).step(0.1).onChange(this.regenerate);
        generalFolder.add(this.params, "angle").min(128.0).max(138.0).step(0.01).onChange(this.regenerate);
        generalFolder.add(this.params, "growth").min(0.04).max(0.25).step(0.01).onChange(this.regenerate);
        generalFolder.add(this.params, "angle_open").min(0).max(80).onChange(this.regenerate);
        generalFolder.add(this.params, "starting_angle_open").min(50).max(100).onChange(this.regenerate);
        generalFolder.add(this.params, "growth_regular").onChange(this.regenerate);
        generalFolder.add(this.params, "strategy",["none", "normal", "radius", "angle", "contour"]).onChange(this.regenerate);

        crownFolder.add(this.params, "crown_phistart").min(0.1).max(6.3).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_philength").min(0.1).max(6.3).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_amplitude").min(0.1).max(10.5).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_freq").min(0.1).max(2.5).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_xoffset").min(0.1).max(15).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_yoffset").min(-7.0).max(25).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_segment").min(2).max(40).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_segment_length").min(0.1).max(5.0).onChange(this.regenerate);
        crownFolder.add(this.params, "crown_length").min(3).max(30).onChange(this.regenerate);

        petalFolder.add(this.params, "petals_from").min(1).max(2000).onChange(this.regenerate);
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

        secPetalFolder.add(this.params, "sec_petals_from").min(1).max(2000).onChange(this.regenerate);
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

        if (!debug) {
            this._addTexturesToMaterial(materials, parrot_type, json, textures);
        }
    }

    _addTexturesToMaterial(materials, bird, json, textures){
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
            material[materialKey].anisotropy = this.maxAnis;
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
