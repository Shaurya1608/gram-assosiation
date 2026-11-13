// Real-World GPS Dataset & OSRM Highway Route Points
export interface GeoStop {
  id: string;
  index: number;
  code: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  day: string;
  date: string;
  legKm: number;
  cumulativeKm: number;
  pitStops: string;
  met: string;
  activities: string;
  learnings: string;
  waterIssues: string;
  waterWisdom: string;
  reflections: string;
}

export interface RouteLeg {
  fromIndex: number;
  toIndex: number;
  fromName: string;
  toName: string;
  roadKm: number;
  points: [number, number][];
}

export const GEO_STOPS: GeoStop[] = [
  {
    "id": "stop-0",
    "index": 0,
    "code": "RJ0",
    "name": "Tilonia",
    "state": "Rajasthan",
    "lat": 26.6577,
    "lng": 74.9358,
    "day": "Day 0 (19.09.16)",
    "date": "19 Sep 2016",
    "legKm": 0,
    "cumulativeKm": 0,
    "pitStops": "Barefoot College Campus & Solar Workshops",
    "met": "Bunker Roy, SWRC Barefoot Engineers & Water Activists",
    "activities": "Flag-off preparations, field equipment calibration, water quality testing toolkit checks, and community prayer.",
    "learnings": "Traditional rainwater harvesting meets solar engineering; rural barefoot barefoot professionals sustaining water sovereignty.",
    "waterIssues": "Extreme semi-arid desert fringe, acute seasonal drought, falling water table, fluoride & saline ground aquifers.",
    "waterWisdom": "Underground Tankas collecting clean rooftop rain, Baoris (stepwells), and community-guarded village recharge ponds.",
    "reflections": "The expedition begins where Gandhian rural self-reliance lives. Turning two wheels into a roving classroom for living water."
  },
  {
    "id": "stop-1",
    "index": 1,
    "code": "RJ1",
    "name": "Jawaja-Beawar",
    "state": "Rajasthan",
    "lat": 25.9612,
    "lng": 74.2215,
    "day": "Day 1 (20.09.16)",
    "date": "20.09.16",
    "legKm": 130,
    "cumulativeKm": 130,
    "pitStops": "-",
    "met": "SWRC Centre",
    "activities": "Met NGO staff; discussed water interventions; visited crèche schools",
    "learnings": "Learned about the construction of large check dams in remote forest areas; importance of community involvement in water projects",
    "waterIssues": "Semi-arid region with erratic rainfall (~400–600 mm annually), harsh summers, and limited surface water. Over-extraction of Groundwater. Industrial Water Use (Cement Factories and Marble Factories). Drying of Traditional Structures. Salinity and Fluoride Contamination.",
    "waterWisdom": "Stepwells (Baoris / Baolis)-Multi-storied stepwells, Used for drinking water. \nTanka- Underground tanks for storing rainwater from rooftops.    Nadi (Village Ponds)- Earthen ponds in depressions to collect monsoon runoff. Key for livestock and groundwater recharge.                                     Johads- Traditional earthen embankments for catching rainwater and enhancing groundwater recharge. Traditional Well System- Deep stone-lined open wells (Kuaan) constructed near catchment areas or ponds. Often part of village social fabric.                                      Earthen Check Dams- Locally dug small percolation ponds that collected rainwater from hill run-offs. Recharged groundwater, supported agriculture and livestock.",
    "reflections": "Accompanied by YFI Co-Fellow Harsh; Good riding experience, cherished our fellowship days."
  },
  {
    "id": "stop-2",
    "index": 2,
    "code": "RJ2",
    "name": "Udaipur",
    "state": "Rajasthan",
    "lat": 24.5854,
    "lng": 73.7125,
    "day": "Day 2 (21.09.16)",
    "date": "21.09.16",
    "legKm": 195,
    "cumulativeKm": 325,
    "pitStops": "SFD (School Of Democracy)",
    "met": "Sheroes Cafe",
    "activities": "Interacted with the staffs of Sheros cafe",
    "learnings": "",
    "waterIssues": "Urbanisation and Encroachment. Siltation and Desalination of ponds Neglect. Decline of Community Management of water bodies. Irregular monsoon rains with intense downpours and longer dry spells",
    "waterWisdom": "Lakes and Ponds- Traditional rainwater harvesting through man made lakes. lakes are interconnected through gravity-fed channels, ensuring overflow from one becomes the source for the next.         Catchment Protection- The Aravalli hills surrounding the lakes were preserved as forested catchments, ensuring slow runoff and clean recharge.                                    Baoris and Kunds (Stepwells and Tanks)-                                        Small Check Dams and Nakas- Panchayati decisions- around rainfall and water use.",
    "reflections": "Inspiring stories of Sheros (Acid attack victims). Accompanied by Co-fellows Suriya and Mona; Harsh departed, continued my journey solo"
  },
  {
    "id": "stop-3",
    "index": 3,
    "code": "RJ3",
    "name": "Dungarpur (Mada)",
    "state": "Rajasthan",
    "lat": 23.843,
    "lng": 73.7147,
    "day": "Day 3 (22.09.16)",
    "date": "22.09.16",
    "legKm": 125,
    "cumulativeKm": 450,
    "pitStops": "-",
    "met": "PEDO",
    "activities": "Participated in community meeting on livestock health, interacted on water conservation and RWH; visited turmeric unit (Maahi Haldi); explored water projects",
    "learnings": "Observed multilayer farming practices; understood integration of agriculture and water management like drip irrigation.",
    "waterIssues": "Depletion of Traditional Water Bodies. Poor Maintenance of Water Structures. High fluoride and iron content. Groundwater Overuse in agriculture.",
    "waterWisdom": "Region utilises traditional methods like talabs (ponds) and anicuts (small dams) to manage water resources, crucial for agriculture in hilly terrains.                              Talabs (Village Ponds)-          Chandela: Small seasonal water harvesting structures; Pat system: Water-sharing channels from streams, used by Bhil farmers collectively.     Stone Check Dams (Bawris)-Dry-stacked stone check dams in hilly areas slowed runoff and recharged groundwater naturally.\nSacred Groves and Streams (nalas)-\nCertain hill streams and groves were protected due to spiritual beliefs, ensuring water source protection.\nTerrace Farming with Water Channels- In hilly areas, terraced fields with built-in small channels helped reduce erosion and retain soil moisture. Traditional Wells-",
    "reflections": "Agriculturally rich area; noted effective use of water in farming"
  },
  {
    "id": "stop-4",
    "index": 4,
    "code": "GJ1",
    "name": "Santrampur",
    "state": "Gujarat",
    "lat": 23.1873,
    "lng": 73.8938,
    "day": "Day 4 (25.09.16)",
    "date": "25.09.16",
    "legKm": 110,
    "cumulativeKm": 560,
    "pitStops": "-",
    "met": "SAARTHI",
    "activities": "Visited farmers; examined water projects",
    "learnings": "Documented farmer experiences; learned about local water challenges",
    "waterIssues": "Groundwater Depletion. Seasonal Water Scarcity. Poor Rainwater Harvesting (Modern). Several villages report fluoride contamination in groundwater. Neglect of Traditional Systems. Dependence on Tankers.",
    "waterWisdom": "Vavs (Stepwells)- Vavs (Stepwells)\nFound in older villages and temple complexes — beautifully designed stepwells used for drinking, rituals, and storing rainwater. Serve both functional and cultural roles.\nTalavs (Village Ponds)-Common community water storage systems that collect monsoon runoff; often located near temples or central village areas. Used for livestock, washing, and some irrigation.                     Khari Bandhs (Earthen Check Dams)-                                Percolation Wells (Recharge Wells)- Dug near Ponds or in catchment areas to recharge groundwater.                       Community Water Norms- maintenance of water sources, traditional crop calendars and water scheduling based on moon cycles and rainfall patterns.",
    "reflections": "Captured valuable insights of farmers."
  },
  {
    "id": "stop-5",
    "index": 5,
    "code": "GJ2",
    "name": "Ahmedabad",
    "state": "Gujarat",
    "lat": 23.0225,
    "lng": 72.5714,
    "day": "Day 10 (29.09.16)",
    "date": "29.09.16",
    "legKm": 170,
    "cumulativeKm": 730,
    "pitStops": "-",
    "met": "Sardar Patel Farms",
    "activities": "Volunteered on organic farm; visited Rani ki Vav rainwater harvesting structure",
    "learnings": "Explored organic farming methods; studied ancient water conservation techniques in farming.",
    "waterIssues": "",
    "waterWisdom": "Stepwells like Rani ki Vav, showcasing historical rainwater harvesting methods. Urban areas are increasingly adopting rooftop rainwater harvesting systems.  Stepwells (Vavs)-  Talavs-          Rainwater Harvesting in Pol Houses- Systems to harvest rainwater from sloping roofs into underground tanks (tanka) for domestic use.                Check Dams and Khadin-like Structures- mud and stone check dams and traditional bunds were built to store runoff and recharge wells.",
    "reflections": "Met co-fellows Minisha and Swetcha"
  },
  {
    "id": "stop-6",
    "index": 6,
    "code": "GJ3",
    "name": "Anand",
    "state": "Gujarat",
    "lat": 22.5645,
    "lng": 72.9289,
    "day": "Day 12 (01.10.16)",
    "date": "01.10.16",
    "legKm": 85,
    "cumulativeKm": 815,
    "pitStops": "-",
    "met": "FES",
    "activities": "Visited FES office; discussed water and community grazing land projects",
    "learnings": "Learned about integrated water resource management and pasture land management",
    "waterIssues": "Groundwater Depletion. Salinity. Inequitable Access. Neglect of Surface Water Bodies. Dependency on Electricity for Irrigation",
    "waterWisdom": "Region focuses on community-led watershed management and the restoration of traditional water bodies to support agriculture and livestock. Virdas-                                        Khet Talavs (Field Ponds)-    Village Talavs-                           Check Dams / Earthen Bunds-                        Shared Wells and Pati- Wells were once shared, with patis (stepped approaches) for women to draw water. These were social spaces too. Now, most are abandoned due to borewell culture.\nCrop Wisdom-",
    "reflections": "Learned about the holistic approach to water and land management"
  },
  {
    "id": "stop-7",
    "index": 7,
    "code": "MP1",
    "name": "Jhabua",
    "state": "Madhya Pradesh",
    "lat": 22.7699,
    "lng": 74.5948,
    "day": "Day 13 (02.10.16)",
    "date": "02.10.16",
    "legKm": 215,
    "cumulativeKm": 1030,
    "pitStops": "-",
    "met": "INREM",
    "activities": "Visited fluoride-affected villages; interacted with bus union; inaugurated temple flower composting unit; conducted session at Krishi Vigyan Kendra",
    "learnings": "Understood fluoride mitigation strategies; importance of rainwater harvesting in affected areas",
    "waterIssues": "Deforestation & Soil Erosion. Seasonal Rivers and Streams. Water Scarcity in Summer. Poor Water Retention Capacity of undulating terrain. Government Schemes Misalignment. Migration Due to Water Insecurity. High fluoride region. Water borne diseases.",
    "waterWisdom": "Jhabua faces groundwater contamination with fluoride. Traditional methods like baoris and tankas are being revived to provide safe drinking water. Bhil Agro-Forestry Wisdom\nBhil communities traditionally used agro-pastoral systems where forests, farms, and water sources were interlinked.\nCheck Dams / Paals-               Bawdis & Dug Wells- Deep traditional wells called bawdis were used not just for water but also for community interaction. These were well-maintained and community-owned.\nContour Trenching & Bunding- Tribal farmers built contour trenches along hillsides to reduce runoff speed, prevent erosion, and increase infiltration.\nSoil and Moisture Conservation by Bhils- The Bhil tribe practices traditional farming that conserves soil moisture, using mixed cropping and mulching methods passed down generations. \nWater Wisdom Circles- \nElder women in some villages acted as knowledge keepers about seasonal springs, underground water pathways, and well maintenance cycles.",
    "reflections": "Engaged with diverse projects on nutrition, water, and education"
  },
  {
    "id": "stop-8",
    "index": 8,
    "code": "MP2",
    "name": "Petlawad",
    "state": "Madhya Pradesh",
    "lat": 23.0039,
    "lng": 74.8021,
    "day": "Day 17 (06.10.16)",
    "date": "06.10.16",
    "legKm": 65,
    "cumulativeKm": 1095,
    "pitStops": "-",
    "met": "SAMPARK",
    "activities": "Conducted session with tribal school children on water; explored seed bank and natural farming initiatives",
    "learnings": "Learned about preservation of indigenous seeds; promotion of natural farming",
    "waterIssues": "Erratic Rainfall & Drought. Overdependence on Borewells. Depletion of Traditional Structures. Poor Soil-Water Retention. Drinking Water Fluoride Contamination",
    "waterWisdom": "Harda and Talai (Talabs)\nSmall earthen water bodies built in contours to hold rainwater. These talais were often community owned and maintained before monsoon.\nBandhis (Field bunds)\nStone and mud bunds created along field boundaries to trap water and enhance soil moisture and recharge aquifers.                                     Johads and Anicuts\nLocally built small check dams across seasonal streams using stone masonry to hold and slow water.                   Bheel Jal Prabandhan (Tribal Water Management)\nBhil community elders used celestial patterns and soil sensing to predict rainfall and adjust sowing or water harvesting efforts accordingly.\nWomen’s Knowledge in Water Use\nTribal women had strong roles in locating shallow aquifers and conserving drinking water.",
    "reflections": "Volunteered in documenting agricultural projects."
  },
  {
    "id": "stop-9",
    "index": 9,
    "code": "MH1",
    "name": "Dhule",
    "state": "Maharashtra",
    "lat": 20.9042,
    "lng": 74.7749,
    "day": "Day 24 (13.10.16)",
    "date": "13.10.16",
    "legKm": 345,
    "cumulativeKm": 1440,
    "pitStops": "-",
    "met": "Gram Panchayt person name- Mr. Pawar.",
    "activities": "Visited rainwater harvesting site; suggested improvements; inaugurated canal project; visited Deshbandhu Foundation",
    "learnings": "Observed community-led water projects; importance of local governance in water management",
    "waterIssues": "Overuse of borewells for cash crops. Dry Rivers. Crop choice mismatch. Erratic monsoons.",
    "waterWisdom": "Area faces water scarcity and employs traditional methods like percolation tanks and bandharas (small dams) for groundwater recharge.                      River-based systems-Traditional check dams and ghats helped in seasonal flow management.                                    Kund and Talavs (ponds)- Villages maintained kunds, and talavs as community-managed sources.        Stone bunding- Small stone bunds and contour bunds on sloping land reduced soil erosion.                                     Bhavli system- Traditional practice in tribal areas for small farm ponds storing water for kharif crops.",
    "reflections": "Noted collaborative efforts between government and NGOs"
  },
  {
    "id": "stop-10",
    "index": 10,
    "code": "MH2",
    "name": "Sakri",
    "state": "Maharashtra",
    "lat": 20.9936,
    "lng": 74.3168,
    "day": "Day 26 (15.10.16)",
    "date": "15.10.16",
    "legKm": 70,
    "cumulativeKm": 1510,
    "pitStops": "-",
    "met": "Nalanda Bal Evam Mahila Vikas Mandal",
    "activities": "Visited households with rooftop rainwater harvesting; conducted water session at Adivasi chatravas (Hostel)",
    "learnings": "Learned rooftop rainwater harvesting techniques and their impact on well recharge",
    "waterIssues": "Groundwater Depletion and Quality Concerns. Seasonal Water Scarcity. Maintenance of Traditional Systems.",
    "waterWisdom": "Phad Irrigation System\nThis ancient community-managed irrigation method involves diverting river water through canals to agricultural fields.                  Percolation Pits and Rooftop- Rainwater harvesting systems, including rooftop collection and natural percolation pits.            Earthfill Dams-\nStore monsoon rainwater, which is then utilized during dry periods, supporting both agriculture and daily water needs.",
    "reflections": "Impressed by community adoption of rooftop rainwater water recharge methods"
  },
  {
    "id": "stop-11",
    "index": 11,
    "code": "MH3",
    "name": "Shani Shingnapur",
    "state": "Maharashtra",
    "lat": 19.4001,
    "lng": 74.8322,
    "day": "Day 27 (16.10.16)",
    "date": "16.10.16",
    "legKm": 305,
    "cumulativeKm": 1815,
    "pitStops": "-",
    "met": "Police Station Shanisingapur. SHO Name-",
    "activities": "Held interactive session with officers",
    "learnings": "Discussed water issues in the rural areas",
    "waterIssues": "Groundwater Depletion. Irregular Rainfall. Limited Traditional Surface Water Bodies. Monoculture & Sugarcane Cultivation.",
    "waterWisdom": "Phad System-                                  Stone-lined Open Wells- built with local stone and lime mortar, served both domestic and agricultural needs. Rainwater Harvesting Practices in Temples- harvested rainwater via stone channels into tanks.",
    "reflections": "Officers provided accommodation; appreciated their hospitality. Witnessed an incredible culture of trust, shops without shutters, homes without doors, driven by reverence for Shani Devta."
  },
  {
    "id": "stop-12",
    "index": 12,
    "code": "MH4",
    "name": "Hivrebazar",
    "state": "Maharashtra",
    "lat": 19.0664,
    "lng": 74.4578,
    "day": "Day 28 (17.10.16)",
    "date": "17.10.16",
    "legKm": 65,
    "cumulativeKm": 1880,
    "pitStops": "-",
    "met": "Shri. Popat Rao Pawar",
    "activities": "Village tour, Discussion with committee, Observed contour trenches, plantation sites",
    "learnings": "Community led water conservation, Integration of social reform and water work, Strong local leadership, Water budgeting and planning",
    "waterIssues": "",
    "waterWisdom": "Chronic drought, groundwater depletion, and soil erosion resolved through watershed development, check dams, percolation tanks, afforestation, and social mobilisation. Watershed Development Approach (Revived Traditional Wisdom)- Contour trenches, nala bunding, and check dams were built to manage runoff and allow groundwater. Soil and Water Conservation with Participatory Norms.                 Water Budgeting- Inspired by traditional agrarian logic — \"plan your crop according to water, not the other way round”.                          Ban on Water-Intensive Crop- \nReuse & Recharge- Greywater reuse in kitchen gardens, rooftop rainwater harvesting, and soak pits for recharge",
    "reflections": "Hivrebazar felt like a living model village. Every person was a stakeholder in water. This was the turning point of my understanding of water justice."
  },
  {
    "id": "stop-13",
    "index": 13,
    "code": "MH5",
    "name": "Ralegan Siddhi",
    "state": "Maharashtra",
    "lat": 19.0189,
    "lng": 74.4367,
    "day": "Day 28 (17.10.16)",
    "date": "17.10.16",
    "legKm": 50,
    "cumulativeKm": 1930,
    "pitStops": "-",
    "met": "Hind Swraj Trust",
    "activities": "Short interaction with Anna Ji; Attended Village development session with the other gram panchayat leaders at Hind Swaraj, Shared my work and learning on water conservation and RWH",
    "learnings": "Community-driven development; importance of self-reliance",
    "waterIssues": "Drought-prone region. Severe water scarcity. Dry wells and borewells. Soil erosion.",
    "waterWisdom": "Contour Bunding\nEarthen bunds constructed along the contours of slopes to reduce runoff, increase infiltration.\nCheck Dams (Nalla bunds)\nSmall check dams built on seasonal streams to slow water flow, recharge wells.\nPercolation Tanks\nExcavated tanks at strategic points to collect monsoon runoff and allow it to percolate.\nAfforestation & Grass Planting\nHills were reforested to prevent erosion and enhance infiltration.\nBan on Free Grazing\nTo protect vegetation and allow soil restoration.\nCommunity Participation\nEntire water planning, implementation, and maintenance were community-owned.\nShramdaan (Voluntary Labour)\nVillagers contributed labor to construct bunds, dams, and tanks.\nRegulated Water Use\nCropping patterns were changed to suit water availability; water distribution was equitable.",
    "reflections": "Good model of what collective effort can achieve"
  },
  {
    "id": "stop-14",
    "index": 14,
    "code": "MH6",
    "name": "Solapur",
    "state": "Maharashtra",
    "lat": 17.6599,
    "lng": 75.9064,
    "day": "Day 30 (19.10.16)",
    "date": "19.10.16",
    "legKm": 270,
    "cumulativeKm": 2200,
    "pitStops": "-",
    "met": "Village Development Officers",
    "activities": "Informal session with officers",
    "learnings": "Discussed rural water management practices",
    "waterIssues": "Groundwater Depletion. Drought-Prone Region  lies in the rain-shadow region of the Western Ghats, receiving low and erratic rainfall (500–600 mm annually)\nMismanagement of Ujani Dam Waters. Pollution of Bhima River.",
    "waterWisdom": "Phad Irrigation System-                 Nadis and Kundi Bhandaras-           Open Wells-                                  Rainwater Harvesting in Temples and Old Houses-",
    "reflections": "Mix culture of Marathi, Telugu and Kannada. Beautiful city and beautiful culture."
  },
  {
    "id": "stop-15",
    "index": 15,
    "code": "KA1",
    "name": "Hospet",
    "state": "Karnataka",
    "lat": 15.2689,
    "lng": 76.3909,
    "day": "Day 31 (20.10.16)",
    "date": "20.10.16",
    "legKm": 345,
    "cumulativeKm": 2545,
    "pitStops": "-",
    "met": "Vivek Kumar (KIIT college mate)",
    "activities": "Visited Tungabhadra Dam and canals",
    "learnings": "Explored irrigation infrastructure",
    "waterIssues": "Mining and Groundwater Depletion in Ballari. Industrialization, Neglect of Traditional Systems. Poor sewage management, leading to contamination of local water bodies.",
    "waterWisdom": "Vijayanagara Empire’s Hydraulic Civilization - A UNESCO-recognized hydraulic marvel. The rulers of Vijayanagara built.         Anicuts (check dams) on Tungabhadra and its tributaries. Interlinked tanks, canals, and aqueducts to store and distribute water.                                              Use of stone conduits and channels (some underground) that managed both irrigation and urban water supply.                                       Kamala Pushkarni (temple tank) and Pushkarni stepwells were central for daily use and rituals.            Kalyanis were built in public spaces and temples to act as reservoirs.           Integration of Religious and Water Structures   Many temples around Hospet had attached tanks for community bathing, drinking, and rituals. The design ensured percolation, groundwater recharge, and seasonal storage.",
    "reflections": "Scale of irrigation and how governance affects it"
  },
  {
    "id": "stop-16",
    "index": 16,
    "code": "KA2",
    "name": "Hampi",
    "state": "Karnataka",
    "lat": 15.335,
    "lng": 76.46,
    "day": "Day 32 (21.10.16)",
    "date": "21.10.16",
    "legKm": 20,
    "cumulativeKm": 2565,
    "pitStops": "-",
    "met": "",
    "activities": "Explored Temples and RWH structures  in premises",
    "learnings": "Ancient wisdom of water management",
    "waterIssues": "Mining and Groundwater Depletion in Ballari. Industrialization, Neglect of Traditional Systems. Poor sewage management, leading to contamination of local water bodies.",
    "waterWisdom": "Vijayanagara Empire’s Hydraulic Civilization - Hampi, a UNESCO-recognized hydraulic marvel. The rulers of Vijayanagara built.         Anicuts (check dams) on Tungabhadra and its tributaries. Interlinked tanks, canals, and aqueducts to store and distribute water.                                              Use of stone conduits and channels (some underground) that managed both irrigation and urban water supply.                                       Kamala Pushkarni (temple tank) and Pushkarni stepwells were central for daily use and rituals.            Kalyanis were built in public spaces and temples to act as reservoirs.           Integration of Religious and Water Structures   Many temples around Hospet had attached tanks for community bathing, drinking, and rituals. The design ensured percolation, groundwater recharge, and seasonal storage.",
    "reflections": "Mesmerized by ancient, scientific water structures"
  },
  {
    "id": "stop-17",
    "index": 17,
    "code": "KA3",
    "name": "Pavagada",
    "state": "Karnataka",
    "lat": 14.1017,
    "lng": 77.2797,
    "day": "Day 36 (25.10.16)",
    "date": "25.10.16",
    "legKm": 215,
    "cumulativeKm": 2780,
    "pitStops": "Chitradurga, KA",
    "met": "THAMATE",
    "activities": "Interacted with farmers Union and THAMATE team",
    "learnings": "Understood challenges of Dalit farmers and water issues",
    "waterIssues": "Groundwater Depletion. borewells reportedly fail in the summer due to dry aquifers. Pond Encroachments. Monsoon Variability. Privatization of Water. Crop Pattern Shift. Farmers suffer due to unreliable irrigation. Use of community tanks and open wells. Also manual scavenging tied to caste and sanitation.",
    "waterWisdom": "Kalyanis (Temple Tanks)\nSacred tanks near temples used for both ritual and daily water needs; helped recharge groundwater.\nKunte (Ponds)\nSmall, open tanks built near farmlands to store rainwater; crucial for livestock and irrigation.\nCheck Dams and Katte\nTraditional low-cost check dams built with local stone and mud to slow runoff and increase percolation\nOpen Wells & Step Wells\nCommon in villages; dug scientifically to tap shallow aquifers; community-shared.\nFodder-based Water Sharing\nFarmers cooperated to share water equitably during droughts, often linked with shared cattle grazing.",
    "reflections": "Farmers offered fuel – deeply moved by their solidarity. At THAMATE, witnessed incredible work for the upliftment of manual scavengers, humble people."
  },
  {
    "id": "stop-18",
    "index": 18,
    "code": "KL1",
    "name": "Wayanad (Sultan Bathery)",
    "state": "Kerala",
    "lat": 11.6625,
    "lng": 76.2573,
    "day": "Day 37 (26.10.16)",
    "date": "26.10.16",
    "legKm": 415,
    "cumulativeKm": 3195,
    "pitStops": "Mayasuru, KA",
    "met": "RAASTA",
    "activities": "Learned about their water interventions",
    "learnings": "High rainfall area, but deforestation caused stream drying. Traditional kulam (ponds) and puzha (stream) rejuvenation are focus areas.",
    "waterIssues": "Drying springs and streams. Declining groundwater levels. Water contamination\nAgrochemical runoff from plantations (tea, coffee, spices) pollutes surface and groundwater. Encroachment on wetlands and ponds. Inadequate access for tribal communities. Flash floods and droughts.",
    "waterWisdom": "Sacred groves (Kavu) and forest springs\nTribal communities preserved groves around perennial springs (called ootukallu or thanneeru), which acted as community water sources.\nPaanis (natural perennial springs)\nUsed mainly by tribal communities for drinking water, these are shallow pits dug in spring zones that refill naturally \nKattas (temporary check dams)\nBamboo and stone bunds made across small streams to slow water flow and recharge groundwater during monsoon\nKulams (ponds)\nSmall village ponds dug to harvest rainwater and runoff; often maintained by communities and used for cattle, bathing, or irrigation.\nMultilayer agroforestry for water retention                                    Water knowledge among tribal elders",
    "reflections": "Met Dhanesh Ji and realised why people called him a walking encyclopaedia. Amazing personality, Amazing storyteller. Enjoyed rinding on hairpin bends of Wayanad ghats."
  },
  {
    "id": "stop-19",
    "index": 19,
    "code": "TN1",
    "name": "Kanyakumari",
    "state": "Tamil Nadu",
    "lat": 8.0883,
    "lng": 77.5385,
    "day": "Day 44 (02.11.16)",
    "date": "02.11.16",
    "legKm": 645,
    "cumulativeKm": 3840,
    "pitStops": "Thiruvanantpuram, KL",
    "met": "Vivekananda Kendra Kanyakumari.",
    "activities": "Interacted with ashram members; discussed RWH. Kendra also doing RWH interventions in the villages.",
    "learnings": "community work and spirituality. Work of Swami Ji in the museum",
    "waterIssues": "Encroachment on traditional tanks and ooranis. Overdependence on Borewells. Saltwater Intrusion. Loss of Traditional Knowledge. Climate Variability",
    "waterWisdom": "Sacred Temple Tanks- Almost every temple has a theppakulam (temple tank) used for ritual and domestic purposes.                                  Oorani System- Oorani refers to small, community-managed village ponds used for drinking water.\nHill-to-Coast Tank Chains\nTanks were constructed in a cascading chain from the Western Ghats foothills to the coastal plains, capturing runoff in every stage\nAgro-based Water Management\nWater from tanks was channeled through anicuts and sluices to paddy fields. \nForest Springs- Many old settlements relied on spring channels for drinking water.                       Palm-lined Water Paths\nPalmyra trees were planted along canals and tanks for both soil stability and groundwater recharge\nTraditional Water Festivals\nFestivals like “Theertham” (holy bathing) reinforced collective tank cleaning and reverence for water bodies.",
    "reflections": "Met Dhanesh Ji, the “walking encyclopedia”; his storytelling and knowledge were unforgettable. Enjoyed the thrill of riding through Wayanad’s hairpin bends ghats. Got caught in the northeast monsoon; 12 hours of riding in the rain—toughest day on the journey. Co-Fellow Kiruba visited but left same day for his sister’s engagement. Reached India’s southernmost tip Kanyakumari. Standing by the sea, I felt awe at our country’s vastness and a sense of how far I had traveled. There was no road ahead, only reflection. It was a call to return, and do more."
  },
  {
    "id": "stop-20",
    "index": 20,
    "code": "TN2",
    "name": "Rameshwaram & Dhanushkodi",
    "state": "Tamil Nadu",
    "lat": 9.2876,
    "lng": 79.3129,
    "day": "Day 47 (05.11.16)",
    "date": "05.11.16",
    "legKm": 325,
    "cumulativeKm": 4165,
    "pitStops": "Ramnathpuram, TN",
    "met": "Abdul Kalam Memorial and Dhanushkodi.",
    "activities": "Visit to Dhanushkodi, Abdul Kalam Memorial and Rameshwarm temple,",
    "learnings": "Understood water issues in saline environments.",
    "waterIssues": "Saltwater Intrusion. Decline of Theerthams. Dependence on Mainland Water. Tourism Pressure. Climate Change Impacts",
    "waterWisdom": "Theerthams (Sacred Water Bodies)- Rameshwaram has 64 traditional theerthams (holy wells and ponds), of which 22 are within the Ramanathaswamy Temple. These are freshwater springs, even on the salty island.                                        Temple Tank Systems-            Rainwater Harvesting Practices- Respect for Aquifers- Sacred wells were not overused due to ritual restrictions, enabling recharge.",
    "reflections": "Demonetisation was announced. Kiruba visited again, visited Dhanushkodi, shared good time."
  },
  {
    "id": "stop-21",
    "index": 21,
    "code": "TN3",
    "name": "Madurai",
    "state": "Tamil Nadu",
    "lat": 9.9252,
    "lng": 78.1198,
    "day": "Day 51 (09.11.16)",
    "date": "09.11.16",
    "legKm": 185,
    "cumulativeKm": 4350,
    "pitStops": "-",
    "met": "-",
    "activities": "Visited madurai temple",
    "learnings": "-",
    "waterIssues": "Drying of Vaigai River. Pollution and Urban Waste. Depletion of Groundwater. Loss of Traditional Systems.",
    "waterWisdom": "Temple Tanks and Community Ponds, Rainwater Harvesting in old Houses. Vaigai River and Canal Systems. Eri System (Tanks)- chain of tanks that trapped monsoon runoff and allowed percolation.",
    "reflections": "Ride ahead got tougher, limited food options due to demonetisation restaurants were not giving change/ currency of less than 500, fatigue kicked in, started falling slightly sick after the rain. Body pain and sleepless nights followed."
  },
  {
    "id": "stop-22",
    "index": 22,
    "code": "TN4",
    "name": "Chennai (Outskirts)",
    "state": "Tamil Nadu",
    "lat": 13.0827,
    "lng": 80.2707,
    "day": "Day 52 (10.11.16)",
    "date": "10.11.16",
    "legKm": 470,
    "cumulativeKm": 4820,
    "pitStops": "Villupuram, TN",
    "met": "-",
    "activities": "-",
    "learnings": "Learned about Eris (tanks)  through people.",
    "waterIssues": "Urban flooding & poor drainage. Groundwater depletion. Pollution of water bodies. Dependence on distant sources. Vanishing traditional tanks",
    "waterWisdom": "Eri (Tank) System, Temple Tanks (Kulam), Oorani, Vazhi (Channels)- Overflow from tanks was smartly routed to the next tank downhill, forming cascading systems.",
    "reflections": "-"
  },
  {
    "id": "stop-23",
    "index": 23,
    "code": "AP1",
    "name": "Nellore",
    "state": "Andhra Pradesh",
    "lat": 14.4426,
    "lng": 79.9865,
    "day": "Day 54 (12.11.16)",
    "date": "12.11.16",
    "legKm": 190,
    "cumulativeKm": 5010,
    "pitStops": "-",
    "met": "-",
    "activities": "-",
    "learnings": "Prone to drought; learned cheruvus (community tanks) for storage",
    "waterIssues": "Tank Encroachment. Neglect of Traditional Systems. Overextraction of Groundwater. Pollution from Aquaculture.",
    "waterWisdom": "Cheruvus (Village Tanks)- Nellore was once part of a vast and well-managed tank irrigation system, often referred to as “Tank Country”. Cheruvus (man-made tanks) were community-owned and managed.                             Traditional Governance – Neeru-Mirasi System Neeruganti (traditional water distributor) and Mirasi system involved local custodians managing water distribution based on need and equity. Kattas (Check Dams) and Bunds- Simple stone or mud check dams were built across seasonal streams to harvest runoff and recharge groundwater.\n\nAgro-Water Practices- Crop calendars",
    "reflections": "-"
  },
  {
    "id": "stop-24",
    "index": 24,
    "code": "AP2",
    "name": "Ongole",
    "state": "Andhra Pradesh",
    "lat": 15.5057,
    "lng": 80.0499,
    "day": "Day 55 (13.11.16)",
    "date": "13.11.16",
    "legKm": 155,
    "cumulativeKm": 5165,
    "pitStops": "-",
    "met": "-",
    "activities": "-",
    "learnings": "Ongole suffers from acute drinking water shortage. Tanker supply common. Old kunta system of RWH.",
    "waterIssues": "Tank System Degradation. Groundwater Overexploitation. Industrial Water Diversion. Seasonal Droughts & Erratic Rainfall.",
    "waterWisdom": "Cheruvu System (Tank Irrigation), Community Governance (Kudimaramathu)- Maintenance of tanks was a collective responsibility under the system known as Kudimaramathu, where villagers desilted tanks before the monsoon. Stone Weirs and Feeder Channels-Minor irrigation structures like anicuts (check dams) and Kalva (feeder canals) diverted rainwater into cheruvus.\nCultural Integration- Tank festival (cheruvu panduga) celebrated tank filling and reflected the spiritual link to water.",
    "reflections": "-"
  },
  {
    "id": "stop-25",
    "index": 25,
    "code": "AP3",
    "name": "Vijayawada",
    "state": "Andhra Pradesh",
    "lat": 16.5062,
    "lng": 80.648,
    "day": "Day 56 (14.11.16)",
    "date": "14.11.16",
    "legKm": 165,
    "cumulativeKm": 5330,
    "pitStops": "-",
    "met": "-",
    "activities": "-",
    "learnings": "-",
    "waterIssues": "Overdependence on Krishna River, Conflicts over Inter-State Water Sharing, Overdevelopment & Groundwater Depletion, Agricultural Stress, Pollution of Krishna River.",
    "waterWisdom": "Krishna Delta Canal System,  Village-Level Tanks & Kuntas, Sand-Based Filtration Wells (Nela Baavis)- Dug wells near sandy riverbeds allowed natural filtration of Krishna water, supplying drinking water.\nTemple Tanks (Pushkarinis)-Barrage-Based Water Regulation (Pre-Dam Wisdom)- The concept of managing floods and irrigation through regulators and barrages existed even before the British built the Prakasam Barrage.",
    "reflections": "-"
  },
  {
    "id": "stop-26",
    "index": 26,
    "code": "AP4",
    "name": "Samarlakota (Rajamahendravaram)",
    "state": "Andhra Pradesh",
    "lat": 17.05,
    "lng": 82.1667,
    "day": "Day 57 (16.11.16)",
    "date": "16.11.16",
    "legKm": 225,
    "cumulativeKm": 5555,
    "pitStops": "-",
    "met": "-",
    "activities": "-",
    "learnings": "-",
    "waterIssues": "Water Shortages, acute water shortages, particularly during summer months.",
    "waterWisdom": "Tank Irrigation Systems: The region has utilized tank irrigation, a practice dating back to the Sangam period (circa 300 B.C.), involving a series of interconnected tanks designed to harvest and store rainwater for agricultural use.                           Canal Networks: Historically, Samarlakota was connected by canals to neighboring towns like Kakinada and Rajahmundry, facilitating not only transportation and trade but also irrigation and water management.",
    "reflections": "-"
  },
  {
    "id": "stop-27",
    "index": 27,
    "code": "AP5",
    "name": "Visakhapatnam",
    "state": "Andhra Pradesh",
    "lat": 17.6868,
    "lng": 83.2185,
    "day": "Day 58 (17.11.16)",
    "date": "17.11.16",
    "legKm": 175,
    "cumulativeKm": 5730,
    "pitStops": "-",
    "met": "-",
    "activities": "-",
    "learnings": "-",
    "waterIssues": "Urban Water Scarcity, Loss of Traditional Water Bodies, Cyclone Damage & Saline Intrusion, Industrial Pollution,  Rainwater Wastage, Despite high rainfall (~1100 mm annually), urban stormwater is poorly harvested.",
    "waterWisdom": "Temple Tanks & Kalyani Systems. Rainwater Harvesting (RWH) in Traditional Homes.                    Mangrove Buffers- Coastal and estuarine communities respected mangrove forests, which acted as natural water filters and flood buffers. Terrace Farming & Bunding in Hills",
    "reflections": "Bike parcelled from here to Patna"
  },
  {
    "id": "stop-28",
    "index": 28,
    "code": "OD1",
    "name": "Berhampur",
    "state": "Odisha",
    "lat": 19.3149,
    "lng": 84.7941,
    "day": "Day 60 (19.11.16)",
    "date": "19.11.16",
    "legKm": 260,
    "cumulativeKm": 5990,
    "pitStops": "-",
    "met": "GRAM Vikas",
    "activities": "Interacted with the students of Residential tribal School om water. Village visit",
    "learnings": "GRAM Vikas worked on gravity-fed piped water and storage.",
    "waterIssues": "Declining Groundwater Table. Dry Hand Pumps & Seasonal Scarcity. Fluoride Contamination in Groundwater, Flooding & Waterlogging, Neglected Traditional Water Bodies",
    "waterWisdom": "Bindha/Bandha (Village Tanks/Ponds)- Large community-managed tanks used for irrigation, bathing, and drinking water.                     Traditional Paddy Field Bunding- Farmers used mud bunds around paddy fields to trap rainwater, increasing percolation and groundwater recharge.             Community Well Culture-       Temple Tank Wisdom-        Traditional Roof Rainwater Harvesting (in Coastal Houses)- Older homes used terracotta pipes and stone basins to channel roof water into underground storage or recharge pits",
    "reflections": "Water at the door steps of the the community worked by Gram Vikas."
  },
  {
    "id": "stop-29",
    "index": 29,
    "code": "OD2",
    "name": "Bhubaneswar (Patia)",
    "state": "Odisha",
    "lat": 20.3548,
    "lng": 85.8197,
    "day": "Day 63 (21.11.16)",
    "date": "21.11.16",
    "legKm": 180,
    "cumulativeKm": 6170,
    "pitStops": "-",
    "met": "KIIT University",
    "activities": "Session at Kalinga Institute of Social Science on water.",
    "learnings": "Good interaction with the students and faculty",
    "waterIssues": "Drying and Encroachment of Tanks., Dependence on River Water, Flooding and Waterlogging, Neglect of Sacred Water Heritage",
    "waterWisdom": "Temple Tanks-                               Ekamra Kshetra Water Network- Bhubaneshwar, once known as Ekamra Kshetra, had a planned water flow system.                                             Tree-Water Link- Temples were surrounded by groves that helped in microclimate regulation and aquifer recharge. Trees like Peepal, Banyan, and Neem were planted along tanks and ghats.",
    "reflections": "Emotional and end to a learning rich journey and amazing people"
  }
];

export const ROUTE_LEGS: RouteLeg[] = [
  {
    "fromIndex": 0,
    "toIndex": 1,
    "fromName": "Tilonia",
    "toName": "Jawaja-Beawar",
    "roadKm": 124.1,
    "points": [
      [
        26.6578,
        74.9364
      ],
      [
        26.6456,
        74.9436
      ],
      [
        26.6222,
        74.9774
      ],
      [
        26.6066,
        74.9822
      ],
      [
        26.589,
        74.8994
      ],
      [
        26.5895,
        74.88
      ],
      [
        26.5985,
        74.8713
      ],
      [
        26.6011,
        74.8556
      ],
      [
        26.5695,
        74.8053
      ],
      [
        26.5588,
        74.7985
      ],
      [
        26.5143,
        74.7061
      ],
      [
        26.5073,
        74.7035
      ],
      [
        26.4759,
        74.7142
      ],
      [
        26.4439,
        74.7013
      ],
      [
        26.3658,
        74.6152
      ],
      [
        26.3599,
        74.5924
      ],
      [
        26.344,
        74.583
      ],
      [
        26.3222,
        74.5531
      ],
      [
        26.2852,
        74.5206
      ],
      [
        26.2789,
        74.499
      ],
      [
        26.2603,
        74.4937
      ],
      [
        26.194,
        74.4377
      ],
      [
        26.1723,
        74.3904
      ],
      [
        26.1535,
        74.3632
      ],
      [
        26.1213,
        74.3422
      ],
      [
        26.0868,
        74.3396
      ],
      [
        26.0748,
        74.323
      ],
      [
        26.0721,
        74.3057
      ],
      [
        26.0248,
        74.2796
      ],
      [
        25.9859,
        74.2418
      ],
      [
        25.9694,
        74.2364
      ],
      [
        25.9658,
        74.2317
      ],
      [
        25.9697,
        74.2255
      ],
      [
        25.9652,
        74.2233
      ]
    ]
  },
  {
    "fromIndex": 1,
    "toIndex": 2,
    "fromName": "Jawaja-Beawar",
    "toName": "Udaipur",
    "roadKm": 191.5,
    "points": [
      [
        25.9652,
        74.2233
      ],
      [
        25.9675,
        74.2325
      ],
      [
        25.8654,
        74.144
      ],
      [
        25.8365,
        74.0885
      ],
      [
        25.7878,
        74.1004
      ],
      [
        25.7047,
        74.0627
      ],
      [
        25.6112,
        73.9811
      ],
      [
        25.601,
        73.9117
      ],
      [
        25.5442,
        73.8708
      ],
      [
        25.4396,
        73.8285
      ],
      [
        25.4126,
        73.7935
      ],
      [
        25.3815,
        73.7767
      ],
      [
        25.3404,
        73.7729
      ],
      [
        25.3095,
        73.7993
      ],
      [
        25.2748,
        73.7799
      ],
      [
        25.2463,
        73.783
      ],
      [
        25.1765,
        73.8398
      ],
      [
        25.0827,
        73.8685
      ],
      [
        25.0283,
        73.8602
      ],
      [
        24.9389,
        73.8236
      ],
      [
        24.9244,
        73.8313
      ],
      [
        24.8573,
        73.7699
      ],
      [
        24.7599,
        73.763
      ],
      [
        24.7228,
        73.7316
      ],
      [
        24.6772,
        73.7386
      ],
      [
        24.6273,
        73.7117
      ],
      [
        24.5852,
        73.7124
      ]
    ]
  },
  {
    "fromIndex": 2,
    "toIndex": 3,
    "fromName": "Udaipur",
    "toName": "Dungarpur (Mada)",
    "roadKm": 105.4,
    "points": [
      [
        24.5852,
        73.7124
      ],
      [
        24.5794,
        73.7094
      ],
      [
        24.5793,
        73.6971
      ],
      [
        24.5699,
        73.6996
      ],
      [
        24.5396,
        73.6855
      ],
      [
        24.4919,
        73.6522
      ],
      [
        24.4657,
        73.6486
      ],
      [
        24.4606,
        73.6544
      ],
      [
        24.4528,
        73.6538
      ],
      [
        24.423,
        73.6391
      ],
      [
        24.413,
        73.6284
      ],
      [
        24.3871,
        73.6377
      ],
      [
        24.3644,
        73.6369
      ],
      [
        24.3525,
        73.6457
      ],
      [
        24.3482,
        73.6584
      ],
      [
        24.3119,
        73.679
      ],
      [
        24.2834,
        73.6731
      ],
      [
        24.2507,
        73.6758
      ],
      [
        24.1988,
        73.7045
      ],
      [
        24.1857,
        73.6961
      ],
      [
        24.182,
        73.6873
      ],
      [
        24.1743,
        73.6858
      ],
      [
        24.149,
        73.6862
      ],
      [
        24.1362,
        73.6957
      ],
      [
        24.1276,
        73.6914
      ],
      [
        24.1106,
        73.6981
      ],
      [
        24.0984,
        73.6941
      ],
      [
        24.0935,
        73.6866
      ],
      [
        24.0714,
        73.6832
      ],
      [
        24.0474,
        73.6619
      ],
      [
        24.0044,
        73.6548
      ],
      [
        23.9854,
        73.6147
      ],
      [
        23.9828,
        73.5937
      ],
      [
        23.9619,
        73.5821
      ],
      [
        23.9243,
        73.6414
      ],
      [
        23.8856,
        73.6634
      ],
      [
        23.869,
        73.6939
      ],
      [
        23.8421,
        73.7154
      ]
    ]
  },
  {
    "fromIndex": 3,
    "toIndex": 4,
    "fromName": "Dungarpur (Mada)",
    "toName": "Santrampur",
    "roadKm": 95.3,
    "points": [
      [
        23.8421,
        73.7154
      ],
      [
        23.8416,
        73.7019
      ],
      [
        23.8265,
        73.6881
      ],
      [
        23.772,
        73.6865
      ],
      [
        23.7594,
        73.6919
      ],
      [
        23.7291,
        73.6927
      ],
      [
        23.7236,
        73.6944
      ],
      [
        23.7121,
        73.7165
      ],
      [
        23.7163,
        73.7367
      ],
      [
        23.6912,
        73.7518
      ],
      [
        23.6709,
        73.7543
      ],
      [
        23.6306,
        73.744
      ],
      [
        23.5897,
        73.764
      ],
      [
        23.5697,
        73.7419
      ],
      [
        23.5577,
        73.7415
      ],
      [
        23.5177,
        73.7698
      ],
      [
        23.5043,
        73.7751
      ],
      [
        23.496,
        73.7706
      ],
      [
        23.4596,
        73.7833
      ],
      [
        23.4526,
        73.7997
      ],
      [
        23.438,
        73.8053
      ],
      [
        23.4303,
        73.7894
      ],
      [
        23.4001,
        73.7788
      ],
      [
        23.3868,
        73.7847
      ],
      [
        23.359,
        73.7829
      ],
      [
        23.3423,
        73.7883
      ],
      [
        23.3311,
        73.7868
      ],
      [
        23.3283,
        73.781
      ],
      [
        23.3026,
        73.7819
      ],
      [
        23.2853,
        73.8382
      ],
      [
        23.1999,
        73.8695
      ],
      [
        23.1947,
        73.8895
      ],
      [
        23.1872,
        73.8938
      ]
    ]
  },
  {
    "fromIndex": 4,
    "toIndex": 5,
    "fromName": "Santrampur",
    "toName": "Ahmedabad",
    "roadKm": 163.8,
    "points": [
      [
        23.1872,
        73.8938
      ],
      [
        23.1947,
        73.8895
      ],
      [
        23.1992,
        73.8702
      ],
      [
        23.1826,
        73.8554
      ],
      [
        23.1837,
        73.8476
      ],
      [
        23.1517,
        73.7889
      ],
      [
        23.1283,
        73.6935
      ],
      [
        23.1325,
        73.6332
      ],
      [
        23.1182,
        73.6235
      ],
      [
        23.1252,
        73.5949
      ],
      [
        23.1386,
        73.5889
      ],
      [
        23.1464,
        73.5759
      ],
      [
        23.1509,
        73.5418
      ],
      [
        23.1411,
        73.5278
      ],
      [
        23.1256,
        73.4804
      ],
      [
        23.1071,
        73.4583
      ],
      [
        23.094,
        73.4534
      ],
      [
        23.0715,
        73.416
      ],
      [
        23.0529,
        73.405
      ],
      [
        23.0252,
        73.3775
      ],
      [
        22.9933,
        73.3704
      ],
      [
        22.961,
        73.3392
      ],
      [
        22.9497,
        73.3354
      ],
      [
        22.9369,
        73.2755
      ],
      [
        22.9363,
        73.2437
      ],
      [
        22.9167,
        73.2013
      ],
      [
        22.9126,
        73.1434
      ],
      [
        22.9023,
        73.0949
      ],
      [
        22.902,
        73.0194
      ],
      [
        22.8841,
        72.9858
      ],
      [
        22.8864,
        72.9787
      ],
      [
        22.8986,
        72.9733
      ],
      [
        22.9451,
        72.9284
      ],
      [
        22.9752,
        72.8898
      ],
      [
        22.9937,
        72.8485
      ],
      [
        22.9969,
        72.7949
      ],
      [
        23.0052,
        72.7571
      ],
      [
        23.0017,
        72.7309
      ],
      [
        23.0106,
        72.7213
      ],
      [
        23.026,
        72.6864
      ],
      [
        23.0206,
        72.6071
      ],
      [
        23.0332,
        72.6012
      ],
      [
        23.0282,
        72.5938
      ],
      [
        23.0267,
        72.5716
      ],
      [
        23.0225,
        72.5714
      ]
    ]
  },
  {
    "fromIndex": 5,
    "toIndex": 6,
    "fromName": "Ahmedabad",
    "toName": "Anand",
    "roadKm": 77.3,
    "points": [
      [
        23.0225,
        72.5714
      ],
      [
        23.0142,
        72.5652
      ],
      [
        23.0102,
        72.581
      ],
      [
        22.9971,
        72.5788
      ],
      [
        22.9624,
        72.5915
      ],
      [
        22.9336,
        72.5954
      ],
      [
        22.8616,
        72.5925
      ],
      [
        22.8309,
        72.607
      ],
      [
        22.7493,
        72.6638
      ],
      [
        22.7311,
        72.6651
      ],
      [
        22.7167,
        72.6864
      ],
      [
        22.7209,
        72.7269
      ],
      [
        22.711,
        72.756
      ],
      [
        22.7079,
        72.8256
      ],
      [
        22.6918,
        72.8295
      ],
      [
        22.6433,
        72.8856
      ],
      [
        22.6304,
        72.9031
      ],
      [
        22.6324,
        72.9121
      ],
      [
        22.6272,
        72.9196
      ],
      [
        22.604,
        72.9308
      ],
      [
        22.5873,
        72.9319
      ],
      [
        22.567,
        72.9438
      ],
      [
        22.5644,
        72.9289
      ]
    ]
  },
  {
    "fromIndex": 6,
    "toIndex": 7,
    "fromName": "Anand",
    "toName": "Jhabua",
    "roadKm": 216.7,
    "points": [
      [
        22.5644,
        72.9289
      ],
      [
        22.5672,
        72.944
      ],
      [
        22.5573,
        72.9571
      ],
      [
        22.5972,
        72.9859
      ],
      [
        22.4874,
        73.0702
      ],
      [
        22.4793,
        73.1053
      ],
      [
        22.4613,
        73.1177
      ],
      [
        22.4988,
        73.3051
      ],
      [
        22.539,
        73.3599
      ],
      [
        22.607,
        73.4059
      ],
      [
        22.7287,
        73.5274
      ],
      [
        22.7883,
        73.5691
      ],
      [
        22.8188,
        73.618
      ],
      [
        22.8083,
        73.6551
      ],
      [
        22.7865,
        73.6763
      ],
      [
        22.8009,
        73.7771
      ],
      [
        22.7931,
        73.8466
      ],
      [
        22.8102,
        73.896
      ],
      [
        22.8057,
        73.9143
      ],
      [
        22.8243,
        73.9279
      ],
      [
        22.8331,
        73.9675
      ],
      [
        22.8438,
        74.0978
      ],
      [
        22.8342,
        74.1294
      ],
      [
        22.8459,
        74.1474
      ],
      [
        22.84,
        74.2084
      ],
      [
        22.8213,
        74.238
      ],
      [
        22.8211,
        74.2798
      ],
      [
        22.7793,
        74.3493
      ],
      [
        22.7995,
        74.3784
      ],
      [
        22.783,
        74.4369
      ],
      [
        22.8173,
        74.5595
      ],
      [
        22.8005,
        74.5693
      ],
      [
        22.7953,
        74.5982
      ],
      [
        22.7703,
        74.595
      ]
    ]
  },
  {
    "fromIndex": 7,
    "toIndex": 8,
    "fromName": "Jhabua",
    "toName": "Petlawad",
    "roadKm": 44.5,
    "points": [
      [
        22.7703,
        74.595
      ],
      [
        22.7717,
        74.5915
      ],
      [
        22.7801,
        74.5897
      ],
      [
        22.8003,
        74.6007
      ],
      [
        22.8106,
        74.6125
      ],
      [
        22.8136,
        74.6267
      ],
      [
        22.8245,
        74.6353
      ],
      [
        22.8344,
        74.6383
      ],
      [
        22.8408,
        74.6481
      ],
      [
        22.8497,
        74.6482
      ],
      [
        22.864,
        74.642
      ],
      [
        22.8724,
        74.6421
      ],
      [
        22.8806,
        74.6542
      ],
      [
        22.8853,
        74.6737
      ],
      [
        22.8849,
        74.691
      ],
      [
        22.8924,
        74.7077
      ],
      [
        22.901,
        74.7193
      ],
      [
        22.9129,
        74.7289
      ],
      [
        22.9172,
        74.747
      ],
      [
        22.9166,
        74.755
      ],
      [
        22.9236,
        74.7715
      ],
      [
        22.9276,
        74.7906
      ],
      [
        22.9306,
        74.796
      ],
      [
        22.9423,
        74.8026
      ],
      [
        22.9444,
        74.8065
      ],
      [
        22.9491,
        74.8071
      ],
      [
        22.9491,
        74.8148
      ],
      [
        22.9564,
        74.8217
      ],
      [
        22.958,
        74.8297
      ],
      [
        22.9659,
        74.8289
      ],
      [
        22.9685,
        74.8214
      ],
      [
        22.984,
        74.8152
      ],
      [
        23.004,
        74.8022
      ]
    ]
  },
  {
    "fromIndex": 8,
    "toIndex": 9,
    "fromName": "Petlawad",
    "toName": "Dhule",
    "roadKm": 298.5,
    "points": [
      [
        23.004,
        74.8022
      ],
      [
        22.8774,
        74.8802
      ],
      [
        22.8303,
        74.8397
      ],
      [
        22.7394,
        74.8418
      ],
      [
        22.6659,
        74.9403
      ],
      [
        22.5679,
        74.912
      ],
      [
        22.5156,
        74.846
      ],
      [
        22.4341,
        74.8342
      ],
      [
        22.3418,
        74.7806
      ],
      [
        22.2608,
        74.7838
      ],
      [
        22.1937,
        74.7599
      ],
      [
        22.1355,
        74.7942
      ],
      [
        22.084,
        74.8883
      ],
      [
        22.0353,
        74.9001
      ],
      [
        21.9882,
        74.9631
      ],
      [
        21.9324,
        74.9508
      ],
      [
        21.9054,
        74.8914
      ],
      [
        21.8356,
        74.9427
      ],
      [
        21.774,
        75.0362
      ],
      [
        21.7444,
        75.0397
      ],
      [
        21.6862,
        75.0983
      ],
      [
        21.5342,
        75.049
      ],
      [
        21.4842,
        75.0029
      ],
      [
        21.3579,
        74.9537
      ],
      [
        21.2844,
        74.8485
      ],
      [
        21.1201,
        74.7907
      ],
      [
        20.9042,
        74.7749
      ]
    ]
  },
  {
    "fromIndex": 9,
    "toIndex": 10,
    "fromName": "Dhule",
    "toName": "Sakri",
    "roadKm": 52.3,
    "points": [
      [
        20.9042,
        74.7749
      ],
      [
        20.9021,
        74.768
      ],
      [
        20.9038,
        74.762
      ],
      [
        20.9018,
        74.6855
      ],
      [
        20.9043,
        74.6635
      ],
      [
        20.9133,
        74.6342
      ],
      [
        20.9162,
        74.6114
      ],
      [
        20.9098,
        74.6015
      ],
      [
        20.9089,
        74.5953
      ],
      [
        20.9117,
        74.5877
      ],
      [
        20.922,
        74.5745
      ],
      [
        20.9259,
        74.5561
      ],
      [
        20.9329,
        74.5422
      ],
      [
        20.9343,
        74.5055
      ],
      [
        20.9458,
        74.4964
      ],
      [
        20.9477,
        74.4756
      ],
      [
        20.9443,
        74.465
      ],
      [
        20.9452,
        74.4581
      ],
      [
        20.9561,
        74.4518
      ],
      [
        20.9587,
        74.4439
      ],
      [
        20.9712,
        74.4344
      ],
      [
        20.9761,
        74.4186
      ],
      [
        20.9839,
        74.4074
      ],
      [
        20.9854,
        74.3793
      ],
      [
        20.9897,
        74.3653
      ],
      [
        20.9875,
        74.3565
      ],
      [
        20.9938,
        74.3446
      ],
      [
        20.9958,
        74.3345
      ],
      [
        20.9936,
        74.3169
      ]
    ]
  },
  {
    "fromIndex": 10,
    "toIndex": 11,
    "fromName": "Sakri",
    "toName": "Shani Shingnapur",
    "roadKm": 239.5,
    "points": [
      [
        20.9936,
        74.3169
      ],
      [
        20.9841,
        74.4074
      ],
      [
        20.9452,
        74.4583
      ],
      [
        20.9458,
        74.4966
      ],
      [
        20.9345,
        74.5056
      ],
      [
        20.933,
        74.5423
      ],
      [
        20.9091,
        74.5982
      ],
      [
        20.8699,
        74.5851
      ],
      [
        20.8441,
        74.6003
      ],
      [
        20.8154,
        74.5796
      ],
      [
        20.692,
        74.5569
      ],
      [
        20.5989,
        74.5231
      ],
      [
        20.5541,
        74.5349
      ],
      [
        20.5544,
        74.526
      ],
      [
        20.5204,
        74.5164
      ],
      [
        20.3523,
        74.4804
      ],
      [
        20.2892,
        74.4418
      ],
      [
        20.2037,
        74.4408
      ],
      [
        20.1963,
        74.4317
      ],
      [
        20.1098,
        74.4546
      ],
      [
        20.0202,
        74.4947
      ],
      [
        19.8817,
        74.4872
      ],
      [
        19.7841,
        74.4684
      ],
      [
        19.6353,
        74.4898
      ],
      [
        19.5313,
        74.5374
      ],
      [
        19.3952,
        74.647
      ],
      [
        19.3713,
        74.648
      ],
      [
        19.3689,
        74.7278
      ],
      [
        19.4005,
        74.8327
      ]
    ]
  },
  {
    "fromIndex": 11,
    "toIndex": 12,
    "fromName": "Shani Shingnapur",
    "toName": "Hivrebazar",
    "roadKm": 79.6,
    "points": [
      [
        19.4005,
        74.8327
      ],
      [
        19.3984,
        74.8326
      ],
      [
        19.3968,
        74.8202
      ],
      [
        19.3937,
        74.82
      ],
      [
        19.3842,
        74.8395
      ],
      [
        19.3808,
        74.8596
      ],
      [
        19.376,
        74.8661
      ],
      [
        19.376,
        74.8858
      ],
      [
        19.3485,
        74.8796
      ],
      [
        19.3151,
        74.8599
      ],
      [
        19.2893,
        74.8484
      ],
      [
        19.2638,
        74.8265
      ],
      [
        19.2536,
        74.8319
      ],
      [
        19.2486,
        74.8308
      ],
      [
        19.1892,
        74.7722
      ],
      [
        19.1357,
        74.7592
      ],
      [
        19.0989,
        74.7425
      ],
      [
        19.099,
        74.7324
      ],
      [
        19.0951,
        74.7283
      ],
      [
        19.0968,
        74.6993
      ],
      [
        19.1004,
        74.6801
      ],
      [
        19.1038,
        74.6308
      ],
      [
        19.1129,
        74.6028
      ],
      [
        19.1124,
        74.5563
      ],
      [
        19.1198,
        74.5409
      ],
      [
        19.1189,
        74.5034
      ],
      [
        19.118,
        74.4999
      ],
      [
        19.0969,
        74.4837
      ],
      [
        19.0925,
        74.4737
      ],
      [
        19.0863,
        74.4724
      ],
      [
        19.0798,
        74.4609
      ],
      [
        19.0676,
        74.4571
      ]
    ]
  },
  {
    "fromIndex": 12,
    "toIndex": 13,
    "fromName": "Hivrebazar",
    "toName": "Ralegan Siddhi",
    "roadKm": 13.1,
    "points": [
      [
        19.0676,
        74.4571
      ],
      [
        19.0697,
        74.4584
      ],
      [
        19.0745,
        74.4589
      ],
      [
        19.0798,
        74.4609
      ],
      [
        19.0851,
        74.4689
      ],
      [
        19.0863,
        74.4724
      ],
      [
        19.0828,
        74.4714
      ],
      [
        19.0817,
        74.4718
      ],
      [
        19.0821,
        74.4709
      ],
      [
        19.0814,
        74.4712
      ],
      [
        19.0749,
        74.4666
      ],
      [
        19.0717,
        74.4652
      ],
      [
        19.0635,
        74.4584
      ],
      [
        19.06,
        74.4569
      ],
      [
        19.0534,
        74.4527
      ],
      [
        19.048,
        74.4507
      ],
      [
        19.0475,
        74.4524
      ],
      [
        19.0458,
        74.4548
      ],
      [
        19.045,
        74.4514
      ],
      [
        19.0451,
        74.4454
      ],
      [
        19.0441,
        74.4454
      ],
      [
        19.044,
        74.4447
      ],
      [
        19.0365,
        74.4437
      ],
      [
        19.0346,
        74.4448
      ],
      [
        19.0329,
        74.443
      ],
      [
        19.0291,
        74.4429
      ],
      [
        19.0246,
        74.4413
      ],
      [
        19.0201,
        74.4411
      ],
      [
        19.0212,
        74.4391
      ],
      [
        19.0214,
        74.4372
      ]
    ]
  },
  {
    "fromIndex": 13,
    "toIndex": 14,
    "fromName": "Ralegan Siddhi",
    "toName": "Solapur",
    "roadKm": 270.3,
    "points": [
      [
        19.0214,
        74.4372
      ],
      [
        19.0147,
        74.4477
      ],
      [
        19.038,
        74.501
      ],
      [
        19.1122,
        74.5489
      ],
      [
        19.1129,
        74.6028
      ],
      [
        19.09,
        74.7518
      ],
      [
        18.8548,
        74.8626
      ],
      [
        18.8033,
        74.9082
      ],
      [
        18.7478,
        75.0054
      ],
      [
        18.655,
        75.0859
      ],
      [
        18.6042,
        75.1115
      ],
      [
        18.5109,
        75.1847
      ],
      [
        18.4044,
        75.1952
      ],
      [
        18.3077,
        75.1489
      ],
      [
        18.2581,
        75.1684
      ],
      [
        18.2343,
        75.1627
      ],
      [
        18.2198,
        75.1871
      ],
      [
        18.1926,
        75.1979
      ],
      [
        18.0392,
        75.1922
      ],
      [
        18.0178,
        75.2156
      ],
      [
        17.9837,
        75.3001
      ],
      [
        17.9273,
        75.3694
      ],
      [
        17.905,
        75.4286
      ],
      [
        17.8562,
        75.5086
      ],
      [
        17.8313,
        75.6054
      ],
      [
        17.8016,
        75.6539
      ],
      [
        17.7835,
        75.7172
      ],
      [
        17.7269,
        75.8404
      ],
      [
        17.6861,
        75.8935
      ],
      [
        17.665,
        75.8937
      ],
      [
        17.6599,
        75.9064
      ]
    ]
  },
  {
    "fromIndex": 14,
    "toIndex": 15,
    "fromName": "Solapur",
    "toName": "Hospet",
    "roadKm": 297.1,
    "points": [
      [
        17.6599,
        75.9064
      ],
      [
        17.3417,
        75.8385
      ],
      [
        17.2622,
        75.8019
      ],
      [
        17.0507,
        75.7782
      ],
      [
        16.8739,
        75.7206
      ],
      [
        16.8244,
        75.7479
      ],
      [
        16.7993,
        75.7336
      ],
      [
        16.3757,
        75.946
      ],
      [
        16.2982,
        75.9167
      ],
      [
        15.9045,
        76.1633
      ],
      [
        15.5462,
        76.24
      ],
      [
        15.3774,
        76.3136
      ],
      [
        15.3257,
        76.3013
      ],
      [
        15.2645,
        76.3485
      ],
      [
        15.2689,
        76.3909
      ]
    ]
  },
  {
    "fromIndex": 15,
    "toIndex": 16,
    "fromName": "Hospet",
    "toName": "Hampi",
    "roadKm": 12.0,
    "points": [
      [
        15.2689,
        76.3909
      ],
      [
        15.2732,
        76.3909
      ],
      [
        15.2761,
        76.3954
      ],
      [
        15.2778,
        76.4055
      ],
      [
        15.2793,
        76.4074
      ],
      [
        15.279,
        76.4103
      ],
      [
        15.2814,
        76.4172
      ],
      [
        15.2832,
        76.4257
      ],
      [
        15.2882,
        76.4354
      ],
      [
        15.2947,
        76.4434
      ],
      [
        15.2984,
        76.4457
      ],
      [
        15.3011,
        76.4489
      ],
      [
        15.3065,
        76.4477
      ],
      [
        15.313,
        76.4509
      ],
      [
        15.3178,
        76.4523
      ],
      [
        15.3216,
        76.4514
      ],
      [
        15.3227,
        76.4531
      ],
      [
        15.327,
        76.4566
      ],
      [
        15.3331,
        76.4568
      ],
      [
        15.3335,
        76.4588
      ]
    ]
  },
  {
    "fromIndex": 16,
    "toIndex": 17,
    "fromName": "Hampi",
    "toName": "Pavagada",
    "roadKm": 193.5,
    "points": [
      [
        15.3335,
        76.4588
      ],
      [
        15.306,
        76.4796
      ],
      [
        15.2402,
        76.4866
      ],
      [
        15.244,
        76.5424
      ],
      [
        15.1853,
        76.7054
      ],
      [
        15.196,
        76.7745
      ],
      [
        15.1902,
        76.799
      ],
      [
        15.1743,
        76.833
      ],
      [
        15.0883,
        76.8845
      ],
      [
        15.0887,
        76.9469
      ],
      [
        15.0002,
        76.9787
      ],
      [
        14.9337,
        76.9751
      ],
      [
        14.7548,
        77.0102
      ],
      [
        14.7044,
        77.0414
      ],
      [
        14.6788,
        77.0739
      ],
      [
        14.5802,
        77.095
      ],
      [
        14.4932,
        77.1302
      ],
      [
        14.3966,
        77.2079
      ],
      [
        14.3464,
        77.2235
      ],
      [
        14.3285,
        77.2405
      ],
      [
        14.2501,
        77.2478
      ],
      [
        14.1587,
        77.2784
      ],
      [
        14.1016,
        77.2799
      ]
    ]
  },
  {
    "fromIndex": 17,
    "toIndex": 18,
    "fromName": "Pavagada",
    "toName": "Wayanad (Sultan Bathery)",
    "roadKm": 395.5,
    "points": [
      [
        14.1016,
        77.2799
      ],
      [
        13.9367,
        77.2848
      ],
      [
        13.913,
        77.258
      ],
      [
        13.874,
        77.1357
      ],
      [
        13.7935,
        77.0684
      ],
      [
        13.8043,
        76.9458
      ],
      [
        13.7857,
        76.9095
      ],
      [
        13.7272,
        76.8888
      ],
      [
        13.6931,
        76.8436
      ],
      [
        13.6186,
        76.6815
      ],
      [
        13.6152,
        76.5916
      ],
      [
        13.5851,
        76.5588
      ],
      [
        13.3117,
        76.6557
      ],
      [
        13.165,
        76.6675
      ],
      [
        13.0961,
        76.7656
      ],
      [
        13.0164,
        76.7374
      ],
      [
        12.9622,
        76.7631
      ],
      [
        12.9093,
        76.7454
      ],
      [
        12.8185,
        76.7573
      ],
      [
        12.6545,
        76.6817
      ],
      [
        12.5662,
        76.6687
      ],
      [
        12.4339,
        76.699
      ],
      [
        12.4164,
        76.671
      ],
      [
        12.3015,
        76.6564
      ],
      [
        12.1578,
        76.6819
      ],
      [
        11.8816,
        76.6649
      ],
      [
        11.8046,
        76.6881
      ],
      [
        11.7304,
        76.4352
      ],
      [
        11.6705,
        76.3679
      ],
      [
        11.6626,
        76.257
      ]
    ]
  },
  {
    "fromIndex": 18,
    "toIndex": 19,
    "fromName": "Wayanad (Sultan Bathery)",
    "toName": "Kanyakumari",
    "roadKm": 601.0,
    "points": [
      [
        11.6626,
        76.257
      ],
      [
        11.4604,
        76.5529
      ],
      [
        11.4054,
        76.7426
      ],
      [
        11.422,
        76.8594
      ],
      [
        11.3607,
        76.9521
      ],
      [
        11.3119,
        76.9311
      ],
      [
        11.2852,
        76.9664
      ],
      [
        11.1789,
        77.2918
      ],
      [
        11.0619,
        77.3888
      ],
      [
        10.728,
        77.5204
      ],
      [
        10.4738,
        77.7921
      ],
      [
        10.2318,
        77.9077
      ],
      [
        9.9791,
        77.9842
      ],
      [
        9.3105,
        77.9184
      ],
      [
        9.0968,
        77.8061
      ],
      [
        8.8523,
        77.777
      ],
      [
        8.7835,
        77.7239
      ],
      [
        8.6847,
        77.7665
      ],
      [
        8.6134,
        77.685
      ],
      [
        8.0883,
        77.5384
      ]
    ]
  },
  {
    "fromIndex": 19,
    "toIndex": 20,
    "fromName": "Kanyakumari",
    "toName": "Rameshwaram",
    "roadKm": 299.6,
    "points": [
      [
        8.0883,
        77.5384
      ],
      [
        8.1094,
        77.5367
      ],
      [
        8.1366,
        77.552
      ],
      [
        8.1381,
        77.569
      ],
      [
        8.1554,
        77.579
      ],
      [
        8.2589,
        77.5668
      ],
      [
        8.3098,
        77.5756
      ],
      [
        8.3623,
        77.6012
      ],
      [
        8.4038,
        77.6076
      ],
      [
        8.4538,
        77.6517
      ],
      [
        8.4808,
        77.6618
      ],
      [
        8.4998,
        77.6462
      ],
      [
        8.5352,
        77.6691
      ],
      [
        8.6134,
        77.6849
      ],
      [
        8.6592,
        77.7147
      ],
      [
        8.6838,
        77.7659
      ],
      [
        8.7151,
        77.7651
      ],
      [
        8.7078,
        77.819
      ],
      [
        8.7137,
        77.8475
      ],
      [
        8.7347,
        77.8738
      ],
      [
        8.7385,
        77.9113
      ],
      [
        8.7345,
        78.0158
      ],
      [
        8.7433,
        78.0487
      ],
      [
        8.805,
        78.148
      ],
      [
        8.8529,
        78.1439
      ],
      [
        8.9233,
        78.1798
      ],
      [
        8.9669,
        78.1806
      ],
      [
        8.9804,
        78.1996
      ],
      [
        9.0046,
        78.1943
      ],
      [
        9.0312,
        78.2548
      ],
      [
        9.1061,
        78.3176
      ],
      [
        9.0837,
        78.3606
      ],
      [
        9.1237,
        78.4168
      ],
      [
        9.1694,
        78.4455
      ],
      [
        9.1712,
        78.4836
      ],
      [
        9.2081,
        78.554
      ],
      [
        9.2189,
        78.6042
      ],
      [
        9.248,
        78.6419
      ],
      [
        9.2467,
        78.6853
      ],
      [
        9.2229,
        78.7028
      ],
      [
        9.2394,
        78.7846
      ],
      [
        9.2858,
        78.8203
      ],
      [
        9.2719,
        78.8721
      ],
      [
        9.2935,
        78.9032
      ],
      [
        9.2969,
        78.953
      ],
      [
        9.2857,
        79.0188
      ],
      [
        9.292,
        79.0404
      ],
      [
        9.2764,
        79.0909
      ],
      [
        9.2876,
        79.3129
      ]
    ]
  },
  {
    "fromIndex": 20,
    "toIndex": 21,
    "fromName": "Rameshwaram",
    "toName": "Madurai",
    "roadKm": 173.4,
    "points": [
      [
        9.2876,
        79.3129
      ],
      [
        9.2764,
        79.0905
      ],
      [
        9.2926,
        79.039
      ],
      [
        9.3084,
        79.0217
      ],
      [
        9.3333,
        78.9718
      ],
      [
        9.3544,
        78.873
      ],
      [
        9.3617,
        78.8729
      ],
      [
        9.3922,
        78.8501
      ],
      [
        9.3943,
        78.8329
      ],
      [
        9.3866,
        78.8232
      ],
      [
        9.4157,
        78.8142
      ],
      [
        9.4253,
        78.7863
      ],
      [
        9.4508,
        78.7708
      ],
      [
        9.4782,
        78.7289
      ],
      [
        9.4885,
        78.7232
      ],
      [
        9.494,
        78.7053
      ],
      [
        9.4891,
        78.702
      ],
      [
        9.4896,
        78.6642
      ],
      [
        9.4831,
        78.6524
      ],
      [
        9.5092,
        78.6307
      ],
      [
        9.5216,
        78.5952
      ],
      [
        9.5389,
        78.574
      ],
      [
        9.5555,
        78.559
      ],
      [
        9.569,
        78.5558
      ],
      [
        9.5771,
        78.4909
      ],
      [
        9.5886,
        78.4551
      ],
      [
        9.6329,
        78.4504
      ],
      [
        9.6587,
        78.4404
      ],
      [
        9.6831,
        78.452
      ],
      [
        9.6996,
        78.447
      ],
      [
        9.7075,
        78.4289
      ],
      [
        9.723,
        78.418
      ],
      [
        9.7297,
        78.4036
      ],
      [
        9.7476,
        78.3916
      ],
      [
        9.7658,
        78.3678
      ],
      [
        9.7686,
        78.3537
      ],
      [
        9.7796,
        78.345
      ],
      [
        9.7815,
        78.3339
      ],
      [
        9.8029,
        78.3071
      ],
      [
        9.805,
        78.2765
      ],
      [
        9.8204,
        78.2487
      ],
      [
        9.8339,
        78.2459
      ],
      [
        9.8626,
        78.2183
      ],
      [
        9.8644,
        78.1914
      ],
      [
        9.9097,
        78.1551
      ],
      [
        9.9252,
        78.1198
      ]
    ]
  },
  {
    "fromIndex": 21,
    "toIndex": 22,
    "fromName": "Madurai",
    "toName": "Chennai (Outskirts)",
    "roadKm": 452.8,
    "points": [
      [
        9.9252,
        78.1198
      ],
      [
        10.2383,
        78.2182
      ],
      [
        10.3442,
        78.3103
      ],
      [
        10.3715,
        78.3845
      ],
      [
        10.4297,
        78.4379
      ],
      [
        10.7363,
        78.6341
      ],
      [
        10.7915,
        78.7072
      ],
      [
        10.8761,
        78.7096
      ],
      [
        11.0232,
        78.8036
      ],
      [
        11.3165,
        78.92
      ],
      [
        11.6292,
        79.1938
      ],
      [
        11.6855,
        79.3114
      ],
      [
        11.7517,
        79.3761
      ],
      [
        11.905,
        79.4675
      ],
      [
        11.9502,
        79.4736
      ],
      [
        12.0149,
        79.5337
      ],
      [
        12.2149,
        79.6413
      ],
      [
        12.3263,
        79.7746
      ],
      [
        12.3797,
        79.7893
      ],
      [
        12.5224,
        79.8957
      ],
      [
        12.6564,
        79.9404
      ],
      [
        12.6593,
        79.9603
      ],
      [
        12.733,
        79.9833
      ],
      [
        12.9113,
        80.1014
      ],
      [
        13.051,
        80.1504
      ],
      [
        13.0827,
        80.2707
      ]
    ]
  },
  {
    "fromIndex": 22,
    "toIndex": 23,
    "fromName": "Chennai (Outskirts)",
    "toName": "Nellore",
    "roadKm": 175.1,
    "points": [
      [
        13.0827,
        80.2707
      ],
      [
        13.1055,
        80.2708
      ],
      [
        13.1443,
        80.2197
      ],
      [
        13.1691,
        80.2221
      ],
      [
        13.1975,
        80.18
      ],
      [
        13.2473,
        80.1529
      ],
      [
        13.3853,
        80.1357
      ],
      [
        13.4138,
        80.1154
      ],
      [
        13.4612,
        80.1139
      ],
      [
        13.5078,
        80.0968
      ],
      [
        13.6019,
        80.0254
      ],
      [
        13.7103,
        80.0103
      ],
      [
        13.7867,
        79.9507
      ],
      [
        13.8111,
        79.9505
      ],
      [
        13.9155,
        79.9003
      ],
      [
        14.0535,
        79.8967
      ],
      [
        14.1693,
        79.8581
      ],
      [
        14.2688,
        79.9034
      ],
      [
        14.3797,
        79.934
      ],
      [
        14.3971,
        79.9461
      ],
      [
        14.3998,
        79.9747
      ],
      [
        14.4293,
        79.9936
      ],
      [
        14.4426,
        79.9865
      ]
    ]
  },
  {
    "fromIndex": 23,
    "toIndex": 24,
    "fromName": "Nellore",
    "toName": "Ongole",
    "roadKm": 129.1,
    "points": [
      [
        14.4426,
        79.9865
      ],
      [
        14.5421,
        79.9926
      ],
      [
        14.5533,
        79.9804
      ],
      [
        14.6805,
        79.9745
      ],
      [
        14.77,
        80.0028
      ],
      [
        14.8698,
        79.9851
      ],
      [
        14.9179,
        80.019
      ],
      [
        14.9444,
        79.9981
      ],
      [
        15.1101,
        80.0087
      ],
      [
        15.1664,
        80.0007
      ],
      [
        15.2302,
        80.0212
      ],
      [
        15.2461,
        80.006
      ],
      [
        15.2804,
        80.0258
      ],
      [
        15.3437,
        80.0259
      ],
      [
        15.3719,
        80.0427
      ],
      [
        15.4695,
        80.0483
      ],
      [
        15.4971,
        80.0682
      ],
      [
        15.5057,
        80.0499
      ]
    ]
  },
  {
    "fromIndex": 24,
    "toIndex": 25,
    "fromName": "Ongole",
    "toName": "Vijayawada",
    "roadKm": 149.7,
    "points": [
      [
        15.5057,
        80.0499
      ],
      [
        15.5513,
        80.0562
      ],
      [
        15.632,
        80.0169
      ],
      [
        15.6977,
        80.019
      ],
      [
        15.7292,
        80.0089
      ],
      [
        15.744,
        80.0269
      ],
      [
        15.9285,
        80.0784
      ],
      [
        16.0495,
        80.1414
      ],
      [
        16.0805,
        80.1405
      ],
      [
        16.1389,
        80.1636
      ],
      [
        16.2031,
        80.2873
      ],
      [
        16.2673,
        80.3547
      ],
      [
        16.2825,
        80.4
      ],
      [
        16.2678,
        80.4584
      ],
      [
        16.2786,
        80.4812
      ],
      [
        16.3286,
        80.4845
      ],
      [
        16.3628,
        80.5005
      ],
      [
        16.4191,
        80.5706
      ],
      [
        16.4993,
        80.6312
      ],
      [
        16.5062,
        80.648
      ]
    ]
  },
  {
    "fromIndex": 25,
    "toIndex": 26,
    "fromName": "Vijayawada",
    "toName": "Samarlakota",
    "roadKm": 201.0,
    "points": [
      [
        16.5062,
        80.648
      ],
      [
        16.5051,
        80.6614
      ],
      [
        16.525,
        80.6818
      ],
      [
        16.5111,
        80.715
      ],
      [
        16.516,
        80.7608
      ],
      [
        16.628,
        80.9426
      ],
      [
        16.6226,
        80.9789
      ],
      [
        16.6782,
        81.0236
      ],
      [
        16.7134,
        81.0288
      ],
      [
        16.7425,
        81.0798
      ],
      [
        16.7371,
        81.1393
      ],
      [
        16.7553,
        81.1962
      ],
      [
        16.8058,
        81.2339
      ],
      [
        16.8106,
        81.2481
      ],
      [
        16.83,
        81.2508
      ],
      [
        16.8428,
        81.2817
      ],
      [
        16.908,
        81.3431
      ],
      [
        16.9258,
        81.3795
      ],
      [
        16.9549,
        81.4053
      ],
      [
        17.0092,
        81.522
      ],
      [
        17.0506,
        81.5422
      ],
      [
        17.0543,
        81.5873
      ],
      [
        17.0173,
        81.6749
      ],
      [
        17.056,
        81.7925
      ],
      [
        17.0406,
        81.8374
      ],
      [
        17.0849,
        81.906
      ],
      [
        17.0773,
        81.9587
      ],
      [
        17.0919,
        82.0122
      ],
      [
        17.0807,
        82.1431
      ],
      [
        17.0496,
        82.1667
      ]
    ]
  },
  {
    "fromIndex": 26,
    "toIndex": 27,
    "fromName": "Samarlakota",
    "toName": "Visakhapatnam",
    "roadKm": 150.8,
    "points": [
      [
        17.0496,
        82.1667
      ],
      [
        17.0471,
        82.1721
      ],
      [
        17.0514,
        82.1751
      ],
      [
        17.0903,
        82.1879
      ],
      [
        17.1034,
        82.2167
      ],
      [
        17.1061,
        82.2435
      ],
      [
        17.1309,
        82.2523
      ],
      [
        17.1322,
        82.2633
      ],
      [
        17.1415,
        82.2749
      ],
      [
        17.1599,
        82.2786
      ],
      [
        17.1662,
        82.2952
      ],
      [
        17.1813,
        82.3065
      ],
      [
        17.1972,
        82.3086
      ],
      [
        17.2393,
        82.3328
      ],
      [
        17.244,
        82.3434
      ],
      [
        17.2417,
        82.3653
      ],
      [
        17.2639,
        82.3776
      ],
      [
        17.2709,
        82.3902
      ],
      [
        17.2715,
        82.4106
      ],
      [
        17.2978,
        82.42
      ],
      [
        17.323,
        82.4809
      ],
      [
        17.3426,
        82.515
      ],
      [
        17.3676,
        82.5422
      ],
      [
        17.3666,
        82.5656
      ],
      [
        17.4054,
        82.7045
      ],
      [
        17.4253,
        82.7425
      ],
      [
        17.4828,
        82.7853
      ],
      [
        17.5035,
        82.7941
      ],
      [
        17.5552,
        82.8451
      ],
      [
        17.5647,
        82.8611
      ],
      [
        17.6201,
        82.8814
      ],
      [
        17.6461,
        82.9085
      ],
      [
        17.6693,
        82.9664
      ],
      [
        17.6907,
        82.9941
      ],
      [
        17.6871,
        83.0168
      ],
      [
        17.6926,
        83.0491
      ],
      [
        17.6862,
        83.082
      ],
      [
        17.6896,
        83.138
      ],
      [
        17.6837,
        83.1527
      ],
      [
        17.6869,
        83.2184
      ]
    ]
  },
  {
    "fromIndex": 27,
    "toIndex": 28,
    "fromName": "Visakhapatnam",
    "toName": "Berhampur",
    "roadKm": 271.2,
    "points": [
      [
        17.6869,
        83.2184
      ],
      [
        17.7011,
        83.2374
      ],
      [
        17.6964,
        83.2563
      ],
      [
        17.7142,
        83.265
      ],
      [
        17.7247,
        83.3085
      ],
      [
        17.7407,
        83.3273
      ],
      [
        17.7619,
        83.3344
      ],
      [
        17.7807,
        83.3582
      ],
      [
        17.8442,
        83.3586
      ],
      [
        17.8948,
        83.377
      ],
      [
        17.9057,
        83.4087
      ],
      [
        17.9283,
        83.4236
      ],
      [
        17.9604,
        83.4184
      ],
      [
        17.9952,
        83.472
      ],
      [
        18.1095,
        83.5664
      ],
      [
        18.1658,
        83.667
      ],
      [
        18.2279,
        83.7135
      ],
      [
        18.2962,
        83.8689
      ],
      [
        18.3336,
        83.8868
      ],
      [
        18.3157,
        83.9251
      ],
      [
        18.3271,
        83.9434
      ],
      [
        18.3706,
        83.982
      ],
      [
        18.3841,
        84.0152
      ],
      [
        18.4206,
        84.0409
      ],
      [
        18.4833,
        84.1237
      ],
      [
        18.6114,
        84.2256
      ],
      [
        18.657,
        84.3014
      ],
      [
        18.7155,
        84.3478
      ],
      [
        18.7231,
        84.3799
      ],
      [
        18.7461,
        84.4009
      ],
      [
        18.7773,
        84.4005
      ],
      [
        18.7894,
        84.45
      ],
      [
        18.8626,
        84.5063
      ],
      [
        18.894,
        84.549
      ],
      [
        18.9636,
        84.5722
      ],
      [
        19.0385,
        84.6237
      ],
      [
        19.1047,
        84.697
      ],
      [
        19.1552,
        84.7084
      ],
      [
        19.2793,
        84.7859
      ],
      [
        19.3149,
        84.7941
      ]
    ]
  },
  {
    "fromIndex": 28,
    "toIndex": 29,
    "fromName": "Berhampur",
    "toName": "Bhubaneswar (Patia)",
    "roadKm": 177.7,
    "points": [
      [
        19.3149,
        84.7941
      ],
      [
        19.3063,
        84.8088
      ],
      [
        19.308,
        84.8454
      ],
      [
        19.3239,
        84.8718
      ],
      [
        19.3506,
        84.9869
      ],
      [
        19.3882,
        85.0625
      ],
      [
        19.4806,
        85.0879
      ],
      [
        19.5115,
        85.0817
      ],
      [
        19.5585,
        85.0909
      ],
      [
        19.6186,
        85.1219
      ],
      [
        19.6845,
        85.1766
      ],
      [
        19.7575,
        85.1905
      ],
      [
        19.914,
        85.382
      ],
      [
        19.9437,
        85.3955
      ],
      [
        19.9483,
        85.4145
      ],
      [
        20.0168,
        85.5022
      ],
      [
        20.0595,
        85.5451
      ],
      [
        20.1599,
        85.607
      ],
      [
        20.2025,
        85.666
      ],
      [
        20.2464,
        85.7816
      ],
      [
        20.2778,
        85.7968
      ],
      [
        20.2955,
        85.8247
      ],
      [
        20.353,
        85.8265
      ],
      [
        20.3548,
        85.8193
      ]
    ]
  }
];

export const FULL_HIGHWAY_ROUTE: [number, number][] = [[26.6578, 74.9364], [26.6456, 74.9436], [26.6222, 74.9774], [26.6066, 74.9822], [26.589, 74.8994], [26.5895, 74.88], [26.5985, 74.8713], [26.6011, 74.8556], [26.5695, 74.8053], [26.5588, 74.7985], [26.5143, 74.7061], [26.5073, 74.7035], [26.4759, 74.7142], [26.4439, 74.7013], [26.3658, 74.6152], [26.3599, 74.5924], [26.344, 74.583], [26.3222, 74.5531], [26.2852, 74.5206], [26.2789, 74.499], [26.2603, 74.4937], [26.194, 74.4377], [26.1723, 74.3904], [26.1535, 74.3632], [26.1213, 74.3422], [26.0868, 74.3396], [26.0748, 74.323], [26.0721, 74.3057], [26.0248, 74.2796], [25.9859, 74.2418], [25.9694, 74.2364], [25.9658, 74.2317], [25.9697, 74.2255], [25.9652, 74.2233], [25.9675, 74.2325], [25.8654, 74.144], [25.8365, 74.0885], [25.7878, 74.1004], [25.7047, 74.0627], [25.6112, 73.9811], [25.601, 73.9117], [25.5442, 73.8708], [25.4396, 73.8285], [25.4126, 73.7935], [25.3815, 73.7767], [25.3404, 73.7729], [25.3095, 73.7993], [25.2748, 73.7799], [25.2463, 73.783], [25.1765, 73.8398], [25.0827, 73.8685], [25.0283, 73.8602], [24.9389, 73.8236], [24.9244, 73.8313], [24.8573, 73.7699], [24.7599, 73.763], [24.7228, 73.7316], [24.6772, 73.7386], [24.6273, 73.7117], [24.5852, 73.7124], [24.5794, 73.7094], [24.5793, 73.6971], [24.5699, 73.6996], [24.5396, 73.6855], [24.4919, 73.6522], [24.4657, 73.6486], [24.4606, 73.6544], [24.4528, 73.6538], [24.423, 73.6391], [24.413, 73.6284], [24.3871, 73.6377], [24.3644, 73.6369], [24.3525, 73.6457], [24.3482, 73.6584], [24.3119, 73.679], [24.2834, 73.6731], [24.2507, 73.6758], [24.1988, 73.7045], [24.1857, 73.6961], [24.182, 73.6873], [24.1743, 73.6858], [24.149, 73.6862], [24.1362, 73.6957], [24.1276, 73.6914], [24.1106, 73.6981], [24.0984, 73.6941], [24.0935, 73.6866], [24.0714, 73.6832], [24.0474, 73.6619], [24.0044, 73.6548], [23.9854, 73.6147], [23.9828, 73.5937], [23.9619, 73.5821], [23.9243, 73.6414], [23.8856, 73.6634], [23.869, 73.6939], [23.8421, 73.7154], [23.8416, 73.7019], [23.8265, 73.6881], [23.772, 73.6865], [23.7594, 73.6919], [23.7291, 73.6927], [23.7236, 73.6944], [23.7121, 73.7165], [23.7163, 73.7367], [23.6912, 73.7518], [23.6709, 73.7543], [23.6306, 73.744], [23.5897, 73.764], [23.5697, 73.7419], [23.5577, 73.7415], [23.5177, 73.7698], [23.5043, 73.7751], [23.496, 73.7706], [23.4596, 73.7833], [23.4526, 73.7997], [23.438, 73.8053], [23.4303, 73.7894], [23.4001, 73.7788], [23.3868, 73.7847], [23.359, 73.7829], [23.3423, 73.7883], [23.3311, 73.7868], [23.3283, 73.781], [23.3026, 73.7819], [23.2853, 73.8382], [23.1999, 73.8695], [23.1947, 73.8895], [23.1872, 73.8938], [23.1947, 73.8895], [23.1992, 73.8702], [23.1826, 73.8554], [23.1837, 73.8476], [23.1517, 73.7889], [23.1283, 73.6935], [23.1325, 73.6332], [23.1182, 73.6235], [23.1252, 73.5949], [23.1386, 73.5889], [23.1464, 73.5759], [23.1509, 73.5418], [23.1411, 73.5278], [23.1256, 73.4804], [23.1071, 73.4583], [23.094, 73.4534], [23.0715, 73.416], [23.0529, 73.405], [23.0252, 73.3775], [22.9933, 73.3704], [22.961, 73.3392], [22.9497, 73.3354], [22.9369, 73.2755], [22.9363, 73.2437], [22.9167, 73.2013], [22.9126, 73.1434], [22.9023, 73.0949], [22.902, 73.0194], [22.8841, 72.9858], [22.8864, 72.9787], [22.8986, 72.9733], [22.9451, 72.9284], [22.9752, 72.8898], [22.9937, 72.8485], [22.9969, 72.7949], [23.0052, 72.7571], [23.0017, 72.7309], [23.0106, 72.7213], [23.026, 72.6864], [23.0206, 72.6071], [23.0332, 72.6012], [23.0282, 72.5938], [23.0267, 72.5716], [23.0225, 72.5714], [23.0142, 72.5652], [23.0102, 72.581], [22.9971, 72.5788], [22.9624, 72.5915], [22.9336, 72.5954], [22.8616, 72.5925], [22.8309, 72.607], [22.7493, 72.6638], [22.7311, 72.6651], [22.7167, 72.6864], [22.7209, 72.7269], [22.711, 72.756], [22.7079, 72.8256], [22.6918, 72.8295], [22.6433, 72.8856], [22.6304, 72.9031], [22.6324, 72.9121], [22.6272, 72.9196], [22.604, 72.9308], [22.5873, 72.9319], [22.567, 72.9438], [22.5644, 72.9289], [22.5672, 72.944], [22.5573, 72.9571], [22.5972, 72.9859], [22.4874, 73.0702], [22.4793, 73.1053], [22.4613, 73.1177], [22.4988, 73.3051], [22.539, 73.3599], [22.607, 73.4059], [22.7287, 73.5274], [22.7883, 73.5691], [22.8188, 73.618], [22.8083, 73.6551], [22.7865, 73.6763], [22.8009, 73.7771], [22.7931, 73.8466], [22.8102, 73.896], [22.8057, 73.9143], [22.8243, 73.9279], [22.8331, 73.9675], [22.8438, 74.0978], [22.8342, 74.1294], [22.8459, 74.1474], [22.84, 74.2084], [22.8213, 74.238], [22.8211, 74.2798], [22.7793, 74.3493], [22.7995, 74.3784], [22.783, 74.4369], [22.8173, 74.5595], [22.8005, 74.5693], [22.7953, 74.5982], [22.7703, 74.595], [22.7717, 74.5915], [22.7801, 74.5897], [22.8003, 74.6007], [22.8106, 74.6125], [22.8136, 74.6267], [22.8245, 74.6353], [22.8344, 74.6383], [22.8408, 74.6481], [22.8497, 74.6482], [22.864, 74.642], [22.8724, 74.6421], [22.8806, 74.6542], [22.8853, 74.6737], [22.8849, 74.691], [22.8924, 74.7077], [22.901, 74.7193], [22.9129, 74.7289], [22.9172, 74.747], [22.9166, 74.755], [22.9236, 74.7715], [22.9276, 74.7906], [22.9306, 74.796], [22.9423, 74.8026], [22.9444, 74.8065], [22.9491, 74.8071], [22.9491, 74.8148], [22.9564, 74.8217], [22.958, 74.8297], [22.9659, 74.8289], [22.9685, 74.8214], [22.984, 74.8152], [23.004, 74.8022], [22.8774, 74.8802], [22.8303, 74.8397], [22.7394, 74.8418], [22.6659, 74.9403], [22.5679, 74.912], [22.5156, 74.846], [22.4341, 74.8342], [22.3418, 74.7806], [22.2608, 74.7838], [22.1937, 74.7599], [22.1355, 74.7942], [22.084, 74.8883], [22.0353, 74.9001], [21.9882, 74.9631], [21.9324, 74.9508], [21.9054, 74.8914], [21.8356, 74.9427], [21.774, 75.0362], [21.7444, 75.0397], [21.6862, 75.0983], [21.5342, 75.049], [21.4842, 75.0029], [21.3579, 74.9537], [21.2844, 74.8485], [21.1201, 74.7907], [20.9042, 74.7749], [20.9021, 74.768], [20.9038, 74.762], [20.9018, 74.6855], [20.9043, 74.6635], [20.9133, 74.6342], [20.9162, 74.6114], [20.9098, 74.6015], [20.9089, 74.5953], [20.9117, 74.5877], [20.922, 74.5745], [20.9259, 74.5561], [20.9329, 74.5422], [20.9343, 74.5055], [20.9458, 74.4964], [20.9477, 74.4756], [20.9443, 74.465], [20.9452, 74.4581], [20.9561, 74.4518], [20.9587, 74.4439], [20.9712, 74.4344], [20.9761, 74.4186], [20.9839, 74.4074], [20.9854, 74.3793], [20.9897, 74.3653], [20.9875, 74.3565], [20.9938, 74.3446], [20.9958, 74.3345], [20.9936, 74.3169], [20.9841, 74.4074], [20.9452, 74.4583], [20.9458, 74.4966], [20.9345, 74.5056], [20.933, 74.5423], [20.9091, 74.5982], [20.8699, 74.5851], [20.8441, 74.6003], [20.8154, 74.5796], [20.692, 74.5569], [20.5989, 74.5231], [20.5541, 74.5349], [20.5544, 74.526], [20.5204, 74.5164], [20.3523, 74.4804], [20.2892, 74.4418], [20.2037, 74.4408], [20.1963, 74.4317], [20.1098, 74.4546], [20.0202, 74.4947], [19.8817, 74.4872], [19.7841, 74.4684], [19.6353, 74.4898], [19.5313, 74.5374], [19.3952, 74.647], [19.3713, 74.648], [19.3689, 74.7278], [19.4005, 74.8327], [19.3984, 74.8326], [19.3968, 74.8202], [19.3937, 74.82], [19.3842, 74.8395], [19.3808, 74.8596], [19.376, 74.8661], [19.376, 74.8858], [19.3485, 74.8796], [19.3151, 74.8599], [19.2893, 74.8484], [19.2638, 74.8265], [19.2536, 74.8319], [19.2486, 74.8308], [19.1892, 74.7722], [19.1357, 74.7592], [19.0989, 74.7425], [19.099, 74.7324], [19.0951, 74.7283], [19.0968, 74.6993], [19.1004, 74.6801], [19.1038, 74.6308], [19.1129, 74.6028], [19.1124, 74.5563], [19.1198, 74.5409], [19.1189, 74.5034], [19.118, 74.4999], [19.0969, 74.4837], [19.0925, 74.4737], [19.0863, 74.4724], [19.0798, 74.4609], [19.0676, 74.4571], [19.0697, 74.4584], [19.0745, 74.4589], [19.0798, 74.4609], [19.0851, 74.4689], [19.0863, 74.4724], [19.0828, 74.4714], [19.0817, 74.4718], [19.0821, 74.4709], [19.0814, 74.4712], [19.0749, 74.4666], [19.0717, 74.4652], [19.0635, 74.4584], [19.06, 74.4569], [19.0534, 74.4527], [19.048, 74.4507], [19.0475, 74.4524], [19.0458, 74.4548], [19.045, 74.4514], [19.0451, 74.4454], [19.0441, 74.4454], [19.044, 74.4447], [19.0365, 74.4437], [19.0346, 74.4448], [19.0329, 74.443], [19.0291, 74.4429], [19.0246, 74.4413], [19.0201, 74.4411], [19.0212, 74.4391], [19.0214, 74.4372], [19.0147, 74.4477], [19.038, 74.501], [19.1122, 74.5489], [19.1129, 74.6028], [19.09, 74.7518], [18.8548, 74.8626], [18.8033, 74.9082], [18.7478, 75.0054], [18.655, 75.0859], [18.6042, 75.1115], [18.5109, 75.1847], [18.4044, 75.1952], [18.3077, 75.1489], [18.2581, 75.1684], [18.2343, 75.1627], [18.2198, 75.1871], [18.1926, 75.1979], [18.0392, 75.1922], [18.0178, 75.2156], [17.9837, 75.3001], [17.9273, 75.3694], [17.905, 75.4286], [17.8562, 75.5086], [17.8313, 75.6054], [17.8016, 75.6539], [17.7835, 75.7172], [17.7269, 75.8404], [17.6861, 75.8935], [17.665, 75.8937], [17.6599, 75.9064], [17.3417, 75.8385], [17.2622, 75.8019], [17.0507, 75.7782], [16.8739, 75.7206], [16.8244, 75.7479], [16.7993, 75.7336], [16.3757, 75.946], [16.2982, 75.9167], [15.9045, 76.1633], [15.5462, 76.24], [15.3774, 76.3136], [15.3257, 76.3013], [15.2645, 76.3485], [15.2689, 76.3909], [15.2732, 76.3909], [15.2761, 76.3954], [15.2778, 76.4055], [15.2793, 76.4074], [15.279, 76.4103], [15.2814, 76.4172], [15.2832, 76.4257], [15.2882, 76.4354], [15.2947, 76.4434], [15.2984, 76.4457], [15.3011, 76.4489], [15.3065, 76.4477], [15.313, 76.4509], [15.3178, 76.4523], [15.3216, 76.4514], [15.3227, 76.4531], [15.327, 76.4566], [15.3331, 76.4568], [15.3335, 76.4588], [15.306, 76.4796], [15.2402, 76.4866], [15.244, 76.5424], [15.1853, 76.7054], [15.196, 76.7745], [15.1902, 76.799], [15.1743, 76.833], [15.0883, 76.8845], [15.0887, 76.9469], [15.0002, 76.9787], [14.9337, 76.9751], [14.7548, 77.0102], [14.7044, 77.0414], [14.6788, 77.0739], [14.5802, 77.095], [14.4932, 77.1302], [14.3966, 77.2079], [14.3464, 77.2235], [14.3285, 77.2405], [14.2501, 77.2478], [14.1587, 77.2784], [14.1016, 77.2799], [13.9367, 77.2848], [13.913, 77.258], [13.874, 77.1357], [13.7935, 77.0684], [13.8043, 76.9458], [13.7857, 76.9095], [13.7272, 76.8888], [13.6931, 76.8436], [13.6186, 76.6815], [13.6152, 76.5916], [13.5851, 76.5588], [13.3117, 76.6557], [13.165, 76.6675], [13.0961, 76.7656], [13.0164, 76.7374], [12.9622, 76.7631], [12.9093, 76.7454], [12.8185, 76.7573], [12.6545, 76.6817], [12.5662, 76.6687], [12.4339, 76.699], [12.4164, 76.671], [12.3015, 76.6564], [12.1578, 76.6819], [11.8816, 76.6649], [11.8046, 76.6881], [11.7304, 76.4352], [11.6705, 76.3679], [11.6626, 76.257], [11.4604, 76.5529], [11.4054, 76.7426], [11.422, 76.8594], [11.3607, 76.9521], [11.3119, 76.9311], [11.2852, 76.9664], [11.1789, 77.2918], [11.0619, 77.3888], [10.728, 77.5204], [10.4738, 77.7921], [10.2318, 77.9077], [9.9791, 77.9842], [9.3105, 77.9184], [9.0968, 77.8061], [8.8523, 77.777], [8.7835, 77.7239], [8.6847, 77.7665], [8.6134, 77.685], [8.0883, 77.5384], [8.1094, 77.5367], [8.1366, 77.552], [8.1381, 77.569], [8.1554, 77.579], [8.2589, 77.5668], [8.3098, 77.5756], [8.3623, 77.6012], [8.4038, 77.6076], [8.4538, 77.6517], [8.4808, 77.6618], [8.4998, 77.6462], [8.5352, 77.6691], [8.6134, 77.6849], [8.6592, 77.7147], [8.6838, 77.7659], [8.7151, 77.7651], [8.7078, 77.819], [8.7137, 77.8475], [8.7347, 77.8738], [8.7385, 77.9113], [8.7345, 78.0158], [8.7433, 78.0487], [8.805, 78.148], [8.8529, 78.1439], [8.9233, 78.1798], [8.9669, 78.1806], [8.9804, 78.1996], [9.0046, 78.1943], [9.0312, 78.2548], [9.1061, 78.3176], [9.0837, 78.3606], [9.1237, 78.4168], [9.1694, 78.4455], [9.1712, 78.4836], [9.2081, 78.554], [9.2189, 78.6042], [9.248, 78.6419], [9.2467, 78.6853], [9.2229, 78.7028], [9.2394, 78.7846], [9.2858, 78.8203], [9.2719, 78.8721], [9.2935, 78.9032], [9.2969, 78.953], [9.2857, 79.0188], [9.292, 79.0404], [9.2764, 79.0909], [9.2876, 79.3129], [9.2764, 79.0905], [9.2926, 79.039], [9.3084, 79.0217], [9.3333, 78.9718], [9.3544, 78.873], [9.3617, 78.8729], [9.3922, 78.8501], [9.3943, 78.8329], [9.3866, 78.8232], [9.4157, 78.8142], [9.4253, 78.7863], [9.4508, 78.7708], [9.4782, 78.7289], [9.4885, 78.7232], [9.494, 78.7053], [9.4891, 78.702], [9.4896, 78.6642], [9.4831, 78.6524], [9.5092, 78.6307], [9.5216, 78.5952], [9.5389, 78.574], [9.5555, 78.559], [9.569, 78.5558], [9.5771, 78.4909], [9.5886, 78.4551], [9.6329, 78.4504], [9.6587, 78.4404], [9.6831, 78.452], [9.6996, 78.447], [9.7075, 78.4289], [9.723, 78.418], [9.7297, 78.4036], [9.7476, 78.3916], [9.7658, 78.3678], [9.7686, 78.3537], [9.7796, 78.345], [9.7815, 78.3339], [9.8029, 78.3071], [9.805, 78.2765], [9.8204, 78.2487], [9.8339, 78.2459], [9.8626, 78.2183], [9.8644, 78.1914], [9.9097, 78.1551], [9.9252, 78.1198], [10.2383, 78.2182], [10.3442, 78.3103], [10.3715, 78.3845], [10.4297, 78.4379], [10.7363, 78.6341], [10.7915, 78.7072], [10.8761, 78.7096], [11.0232, 78.8036], [11.3165, 78.92], [11.6292, 79.1938], [11.6855, 79.3114], [11.7517, 79.3761], [11.905, 79.4675], [11.9502, 79.4736], [12.0149, 79.5337], [12.2149, 79.6413], [12.3263, 79.7746], [12.3797, 79.7893], [12.5224, 79.8957], [12.6564, 79.9404], [12.6593, 79.9603], [12.733, 79.9833], [12.9113, 80.1014], [13.051, 80.1504], [13.0827, 80.2707], [13.1055, 80.2708], [13.1443, 80.2197], [13.1691, 80.2221], [13.1975, 80.18], [13.2473, 80.1529], [13.3853, 80.1357], [13.4138, 80.1154], [13.4612, 80.1139], [13.5078, 80.0968], [13.6019, 80.0254], [13.7103, 80.0103], [13.7867, 79.9507], [13.8111, 79.9505], [13.9155, 79.9003], [14.0535, 79.8967], [14.1693, 79.8581], [14.2688, 79.9034], [14.3797, 79.934], [14.3971, 79.9461], [14.3998, 79.9747], [14.4293, 79.9936], [14.4426, 79.9865], [14.5421, 79.9926], [14.5533, 79.9804], [14.6805, 79.9745], [14.77, 80.0028], [14.8698, 79.9851], [14.9179, 80.019], [14.9444, 79.9981], [15.1101, 80.0087], [15.1664, 80.0007], [15.2302, 80.0212], [15.2461, 80.006], [15.2804, 80.0258], [15.3437, 80.0259], [15.3719, 80.0427], [15.4695, 80.0483], [15.4971, 80.0682], [15.5057, 80.0499], [15.5513, 80.0562], [15.632, 80.0169], [15.6977, 80.019], [15.7292, 80.0089], [15.744, 80.0269], [15.9285, 80.0784], [16.0495, 80.1414], [16.0805, 80.1405], [16.1389, 80.1636], [16.2031, 80.2873], [16.2673, 80.3547], [16.2825, 80.4], [16.2678, 80.4584], [16.2786, 80.4812], [16.3286, 80.4845], [16.3628, 80.5005], [16.4191, 80.5706], [16.4993, 80.6312], [16.5062, 80.648], [16.5051, 80.6614], [16.525, 80.6818], [16.5111, 80.715], [16.516, 80.7608], [16.628, 80.9426], [16.6226, 80.9789], [16.6782, 81.0236], [16.7134, 81.0288], [16.7425, 81.0798], [16.7371, 81.1393], [16.7553, 81.1962], [16.8058, 81.2339], [16.8106, 81.2481], [16.83, 81.2508], [16.8428, 81.2817], [16.908, 81.3431], [16.9258, 81.3795], [16.9549, 81.4053], [17.0092, 81.522], [17.0506, 81.5422], [17.0543, 81.5873], [17.0173, 81.6749], [17.056, 81.7925], [17.0406, 81.8374], [17.0849, 81.906], [17.0773, 81.9587], [17.0919, 82.0122], [17.0807, 82.1431], [17.0496, 82.1667], [17.0471, 82.1721], [17.0514, 82.1751], [17.0903, 82.1879], [17.1034, 82.2167], [17.1061, 82.2435], [17.1309, 82.2523], [17.1322, 82.2633], [17.1415, 82.2749], [17.1599, 82.2786], [17.1662, 82.2952], [17.1813, 82.3065], [17.1972, 82.3086], [17.2393, 82.3328], [17.244, 82.3434], [17.2417, 82.3653], [17.2639, 82.3776], [17.2709, 82.3902], [17.2715, 82.4106], [17.2978, 82.42], [17.323, 82.4809], [17.3426, 82.515], [17.3676, 82.5422], [17.3666, 82.5656], [17.4054, 82.7045], [17.4253, 82.7425], [17.4828, 82.7853], [17.5035, 82.7941], [17.5552, 82.8451], [17.5647, 82.8611], [17.6201, 82.8814], [17.6461, 82.9085], [17.6693, 82.9664], [17.6907, 82.9941], [17.6871, 83.0168], [17.6926, 83.0491], [17.6862, 83.082], [17.6896, 83.138], [17.6837, 83.1527], [17.6869, 83.2184], [17.7011, 83.2374], [17.6964, 83.2563], [17.7142, 83.265], [17.7247, 83.3085], [17.7407, 83.3273], [17.7619, 83.3344], [17.7807, 83.3582], [17.8442, 83.3586], [17.8948, 83.377], [17.9057, 83.4087], [17.9283, 83.4236], [17.9604, 83.4184], [17.9952, 83.472], [18.1095, 83.5664], [18.1658, 83.667], [18.2279, 83.7135], [18.2962, 83.8689], [18.3336, 83.8868], [18.3157, 83.9251], [18.3271, 83.9434], [18.3706, 83.982], [18.3841, 84.0152], [18.4206, 84.0409], [18.4833, 84.1237], [18.6114, 84.2256], [18.657, 84.3014], [18.7155, 84.3478], [18.7231, 84.3799], [18.7461, 84.4009], [18.7773, 84.4005], [18.7894, 84.45], [18.8626, 84.5063], [18.894, 84.549], [18.9636, 84.5722], [19.0385, 84.6237], [19.1047, 84.697], [19.1552, 84.7084], [19.2793, 84.7859], [19.3149, 84.7941], [19.3063, 84.8088], [19.308, 84.8454], [19.3239, 84.8718], [19.3506, 84.9869], [19.3882, 85.0625], [19.4806, 85.0879], [19.5115, 85.0817], [19.5585, 85.0909], [19.6186, 85.1219], [19.6845, 85.1766], [19.7575, 85.1905], [19.914, 85.382], [19.9437, 85.3955], [19.9483, 85.4145], [20.0168, 85.5022], [20.0595, 85.5451], [20.1599, 85.607], [20.2025, 85.666], [20.2464, 85.7816], [20.2778, 85.7968], [20.2955, 85.8247], [20.353, 85.8265], [20.3548, 85.8193]];
