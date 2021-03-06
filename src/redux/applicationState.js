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
    propertiesData: undefined,
    nationalGridData: undefined,

    dist_ref: [
      "KARENGA", "KITGUM", "AGAGO", "KOTIDO", "ABIM", "OTUKE", "KAPELEBYONG",
      "AMURIA", "SOROTI", "SERERE", "PALLISA", "KALIRO", "NAMUTUMBA", "IGANGA",
      "BUGWERI", "MAYUGE", "BUGIRI", "ALEBTONG", "KALAKI", "BUYENDE", "LUUKA",
      "JINJA", "LAMWO", "KABERAMAIDO", "KAMULI", "BUIKWE", "DOKOLO", "MASINDI",
      "KYANKWANZI", "KIBOGA", "KASSANDA", "GOMBA", "BUKOMANSIMBI", "KALUNGU",
      "LWENGO", "MASAKA", "KYOTERA", "MOYO", "OBONGI", "ADJUMANI", "AMURU",
      "NWOYA", "KIRYANDONGO", "BULIISA", "HOIMA", "MUBENDE", "SSEMBABULE",
      "KAKUMIRO", "RAKAI", "YUMBE", "PAKWACH", "KIKUUBE", "ARUA", "MADI OKOLLO",
      "NEBBI", "LYANTONDE", "KIBAALE", "KYEGEGWA", "ISINGIRO", "KAGADI",
      "KIRUHURA", "ZOMBO", "KAZO", "KOBOKO", "NAKASONGOLA", "NAKASEKE", "LUWERO",
      "WAKISO", "MPIGI", "GULU", "OMORO", "OYAM", "APAC", "BUTAMBALA", "AMOLATAR",
      "MITYANA", "NTOROKO", "BUNDIBUGYO", "KABAROLE", "BUNYANGABU", "KASESE",
      "KAMWENGE", "KITAGWENDA", "RUBIRIZI", "IBANDA", "BUHWEJU", "BUSHENYI",
      "SHEEMA", "NTUNGAMO", "RUKIGA", "MITOOMA", "KABALE", "RUKUNGIRI", "RUBANDA",
      "KANUNGU", "KISORO", "MARACHA", "KYENJOJO", "MBARARA", "RWAMPARA", "MOROTO",
      "NABILATUK", "NAKAPIRIPIRIT", "KWEEN", "AMUDAT", "BUKWO", "KAABONG", "NAPAK",
      "KAPCHORWA", "BULAMBULI", "BUDUDA", "SIRONKO", "NAMISINDWA", "MBALE", "MANAFWA",
      "TORORO", "KATAKWI", "KUMI", "BUKEDEA", "BUTEBO", "BUDAKA", "BUTALEJA", "BUSIA",
      "PADER", "KAYUNGA", "LIRA", "MUKONO", "KOLE", "KWANIA", "KAMPALA", "NGORA",
      "KIBUKU", "NAMAYINGO",
    ],
  },
  initialChartState: {
    pieChartData: [],
    piechartIndicators: [],
    updatedPieChart: [],
    pieChartDataUpdated: false,
    populationChartData: [],
    rainfallChartData: [],
    cropHealthChartData: [],
    temperatureChartData: [],
    temperatureNationalGridcells: [],
    cropHealthNationalGridcells: [],
    vegetationHealthChartData: [],
    chartView: false,
    averagenationalGridcells: [],
    populationAverageNationalGridcells: [],
    rainfallNationalGridcells: [],
    vegetationHealthNationalGridcells: [],
    temperalChartFn: function (data_) {
      let datasets = [];
      let backColors = {
        backgroundColor: ["rgba(255,99,132,0.2)", "rgba(75,192,192,1)"],
        borderColor: ["rgba(255,99,132,1)", "rgba(75,192,192,1)"]
      }
      Object.keys(data_).forEach((key_, index) => {
        datasets.push({
          label: key_,
          fill: false,
          backgroundColor: backColors.backgroundColor[index],
          borderColor: backColors.borderColor[index],
          borderWidth: 2,
          data: data_[key_]
        })
      })
      return {
        labels: ['Q1', 'Q2', 'Q3',
          'Q4'],
        datasets: [...datasets]
      }
    }
  },
  initialLocationState: {
    locationValue: [],
  },
  initialSliderState: {
    sliderValue: [],
    landCoverResults: [],
    indicators: {
      0: "ppp_sum", 1: "soil_copper", 2: "soil_phos", 3: "soil_potas",
      4: "soil_boron", 5: "soil_alumi", 6: "soil_iron", 7: "soil_magne",
      8: "ndwi_jfm", 9: "ndwi_amj", 10: "ndwi_jas", 11: "ndwi_ond",
      12: "presp_jfm", 13: "presp_amj", 14: "presp_jas", 15: "presp_ond",
      16: "ndvi_jfm", 17: "ndvi_amj", 18: "ndvi_jas", 19: "ndvi_ond",
      20: "slope", 21: "elevation", 22: "lst_jfm", 23: "lst_amj", 24: "lst_jas",
      25: "lst_ond",
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
