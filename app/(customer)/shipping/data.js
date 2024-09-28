// DUMMY DELIVERY CHARGE DATA
export const DELIVERY_CHARGES = {
  Nepal: {
    charges: 100, // Country-level charges
    provinces: {
      Bagmati: {
        charges: 80, // Province-level charges
        districts: {
          Kathmandu: {
            charges: 60, // District-level charges
            cities: {
              Sano_Bharyang: {
                charges: 50, // City-level charges
              },
              Kalanki: {
                charges: 40, // City-level charges
              },
              Kirtipur: {
                charges: 30, // City-level charges
              },
            },
          },
          Lalitpur: {
            charges: 55, // District-level charges
            cities: {
              Patan: {
                charges: 60, // City-level charges
              },
              Lubhu: {
                charges: 55, // City-level charges
              },
            },
          },
          Bhaktapur: {
            charges: 50, // District-level charges
            cities: {
              Bhaktapur: {
                charges: 45, // City-level charges
              },
              Suryabinayak: {
                charges: 40, // City-level charges
              },
            },
          },
        },
      },
      Gandaki: {
        charges: 75, // Province-level charges
        districts: {
          Kaski: {
            charges: 65, // District-level charges
            cities: {
              Pokhara: {
                charges: 70, // City-level charges
              },
              Lekhnath: {
                charges: 65, // City-level charges
              },
            },
          },
          Tanahun: {
            charges: 55, // District-level charges
            cities: {
              Damauli: {
                charges: 50, // City-level charges
              },
            },
          },
        },
      },
      Lumbini: {
        charges: 85, // Province-level charges
        districts: {
          Rupandehi: {
            charges: 70, // District-level charges
            cities: {
              Butwal: {
                charges: 80, // City-level charges
              },
              Sainamaina: {
                charges: 75, // City-level charges
              },
            },
          },
          Nawalparasi: {
            charges: 60, // District-level charges
            cities: {
              Bardaghat: {
                charges: 55, // City-level charges
              },
            },
          },
        },
      },
      Karnali: {
        charges: 90, // Province-level charges
        districts: {
          Surkhet: {
            charges: 70, // District-level charges
            cities: {
              Birendranagar: {
                charges: 60, // City-level charges
              },
            },
          },
          Jumla: {
            charges: 55, // District-level charges
            cities: {
              Jumla: {
                charges: 45, // City-level charges
              },
            },
          },
        },
      },
      Sudurpashchim: {
        charges: 95, // Province-level charges
        districts: {
          Kailali: {
            charges: 65, // District-level charges
            cities: {
              Dhangadhi: {
                charges: 50, // City-level charges
              },
            },
          },
          Kanchanpur: {
            charges: 60, // District-level charges
            cities: {
              Mahendranagar: {
                charges: 55, // City-level charges
              },
            },
          },
        },
      },
    },
  },
  India: {
    charges: 150,
    provinces: {
      Maharashtra: {
        charges: 120,
        districts: {
          Mumbai: {
            charges: 100,
            cities: {
              Bandra: {
                charges: 90,
              },
              Andheri: {
                charges: 85,
              },
            },
          },
          Pune: {
            charges: 95,
            cities: {
              Shivajinagar: {
                charges: 85,
              },
              Hinjewadi: {
                charges: 80,
              },
            },
          },
        },
      },
      Gujarat: {
        charges: 110,
        districts: {
          Ahmedabad: {
            charges: 95,
            cities: {
              Navrangpura: {
                charges: 90,
              },
              Vastrapur: {
                charges: 85,
              },
            },
          },
        },
      },
    },
  },
  USA: {
    charges: 200,
    provinces: {
      California: {
        charges: 180,
        districts: {
          Los_Angeles: {
            charges: 160,
            cities: {
              Downtown: {
                charges: 150,
              },
              Hollywood: {
                charges: 145,
              },
            },
          },
          San_Francisco: {
            charges: 155,
            cities: {
              SoMa: {
                charges: 150,
              },
              Chinatown: {
                charges: 145,
              },
            },
          },
        },
      },
      Texas: {
        charges: 170,
        districts: {
          Dallas: {
            charges: 160,
            cities: {
              Downtown: {
                charges: 150,
              },
              Uptown: {
                charges: 145,
              },
            },
          },
          Austin: {
            charges: 165,
            cities: {
              Downtown: {
                charges: 160,
              },
              East_Austin: {
                charges: 155,
              },
            },
          },
        },
      },
    },
  },
  Canada: {
    charges: 180,
    provinces: {
      Ontario: {
        charges: 160,
        districts: {
          Toronto: {
            charges: 140,
            cities: {
              Downtown: {
                charges: 130,
              },
              Scarborough: {
                charges: 125,
              },
            },
          },
          Ottawa: {
            charges: 145,
            cities: {
              Byward_Market: {
                charges: 135,
              },
              Kanata: {
                charges: 130,
              },
            },
          },
        },
      },
      British_Columbia: {
        charges: 170,
        districts: {
          Vancouver: {
            charges: 160,
            cities: {
              Downtown: {
                charges: 150,
              },
              Richmond: {
                charges: 145,
              },
            },
          },
        },
      },
    },
  },
};

export const initialCountry = Object.keys(DELIVERY_CHARGES)[0];
export const initialProvince = Object.keys(
  DELIVERY_CHARGES[initialCountry].provinces
)[0];
export const initialDistrict = Object.keys(
  DELIVERY_CHARGES[initialCountry].provinces[initialProvince].districts
)[0];
export const initialCity = Object.keys(
  DELIVERY_CHARGES[initialCountry].provinces[initialProvince].districts[
    initialDistrict
  ].cities
)[0];
