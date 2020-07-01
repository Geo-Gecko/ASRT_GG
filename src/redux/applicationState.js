const AppState = {
  initialMapState: {
    lat: 0.32958802605356885,
    lng: 32.34375,
    zoom: 7,
    district: "Hover over the map",
    mapGrids: [],
    updatedMapGrids: [],
    mapUpdated: false,
    sliderValues: {},
    currentsliderValues: [],
    landCoverSliderValues: {},
    landCovermapUpdated: false,
    updateIndicatorSize: "",
    initialIndicatorSize: "",
    updateInitialIndicatorSize: false,
    indicatorTitle: "",
    dist_ref: [
      "ABIM",
      "ADJUMANI",
      "AGAGO",
      "ALEBTONG",
      "AMOLATAR",
      "AMUDAT",
      "AMURIA",
      "AMURU",
      "APAC",
      "ARUA",
      "BUDAKA",
      "BUDUDA",
      "BUGIRI",
      "BUGWERI",
      "BUHWEJU",
      "BUIKWE",
      "BUKEDEA",
      "BUKOMANSIMBI",
      "BUKWO",
      "BULAMBULI",
      "BULIISA",
      "BUNDIBUGYO",
      "BUNYANGABU",
      "BUSHENYI",
      "BUSIA",
      "BUTALEJA",
      "BUTAMBALA",
      "BUTEBO",
      "BUYENDE",
      "DOKOLO",
      "GOMBA",
      "GULU",
      "HOIMA",
      "IBANDA",
      "IGANGA",
      "ISINGIRO",
      "JINJA",
      "KAABONG",
      "KABALE",
      "KABAROLE",
      "KABERAMAIDO",
      "KAGADI",
      "KAKUMIRO",
      "KALAKI",
      "KALIRO",
      "KALUNGU",
      "KAMPALA",
      "KAMULI",
      "KAMWENGE",
      "KANUNGU",
      "KAPCHORWA",
      "KAPELEBYONG",
      "KARENGA",
      "KASESE",
      "KASSANDA",
      "KATAKWI",
      "KAYUNGA",
      "KAZO",
      "KIBAALE",
      "KIBOGA",
      "KIBUKU",
      "KIKUUBE",
      "KIRUHURA",
      "KIRYANDONGO",
      "KISORO",
      "KITAGWENDA",
      "KITGUM",
      "KOBOKO",
      "KOLE",
      "KOTIDO",
      "KUMI",
      "KWANIA",
      "KWEEN",
      "KYANKWANZI",
      "KYEGEGWA",
      "KYENJOJO",
      "KYOTERA",
      "LAMWO",
      "LIRA",
      "LUUKA",
      "LUWERO",
      "LWENGO",
      "LYANTONDE",
      "MADI OKOLLO",
      "MANAFWA",
      "MARACHA",
      "MASAKA",
      "MASINDI",
      "MAYUGE",
      "MBALE",
      "MBARARA",
      "MITOOMA",
      "MITYANA",
      "MOROTO",
      "MOYO",
      "MPIGI",
      "MUBENDE",
      "MUKONO",
      "NABILATUK",
      "NAKAPIRIPIRIT",
      "NAKASEKE",
      "NAKASONGOLA",
      "NAMAYINGO",
      "NAMISINDWA",
      "NAMUTUMBA",
      "NAPAK",
      "NEBBI",
      "NGORA",
      "NTOROKO",
      "NTUNGAMO",
      "NWOYA",
      "OBONGI",
      "OMORO",
      "OTUKE",
      "OYAM",
      "PADER",
      "PAKWACH",
      "PALLISA",
      "RAKAI",
      "RUBANDA",
      "RUBIRIZI",
      "RUKIGA",
      "RUKUNGIRI",
      "RWAMPARA",
      "SERERE",
      "SHEEMA",
      "SIRONKO",
      "SOROTI",
      "SSEMBABULE",
      "TORORO",
      "WAKISO",
      "YUMBE",
      "ZOMBO",
    ],
  },
  initialChartState: {
    pieChartData: [],
    piechartIndicators: [],
    updatedPieChart: [],
    pieChartDataUpdated: false,
    populationChartData: [],
    chartView: false,
    rainfallChartData: [],
    averagenationalGridcells: [],
    populationAverageNationalGridcells: [],
  },
  initialLocationState: {
    locationValue: [],
  },
  initialSliderState: {
    sliderValue: [],
    landCoverResults: [],
    indicators: {
      0: "ppp_sum",
      1: "soil_copper",
      2: "soil_phos",
      3: "soil_potas",
      4: "soil_boron",
      5: "soil_alumi",
      6: "soil_iron",
      7: "soil_magne",
      8: "ndwi_jfm",
      9: "presp_jfm",
      10: "ndvi_jfm",
      11: "slope",
      12: "elevation",
      13: "lst_jfm",
    },
    land_cover: {
      1: "land_cover",
    },
    landCoverCheckBox: {
      0: "No data",
      1: "Trees Cover Areas",
      2: "Shrub Cover Areas",
      3: "Grassland",
      4: "Cropland",
      5: "Vegetation aquatic or regularly flooded",
      6: "Lichen Mosses / Sparse vegetation",
      7: "Bare Areas",
      8: "Built Up areas",
      9: "snow and ice",
      10: "open water",
    },
  },
};
export default AppState;
