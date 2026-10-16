// Transcribed verbatim from VSP Essential Medical Eye Care (Mar 30, 2026),
// extracted via pdftotext from Essential_Medical_Eye_Care.pdf
const CODE_TABLES = {
 "oct_anterior_2x": [
  {
   "start": "H17.01",
   "end": "H17.03",
   "label": "Adherent leukoma"
  },
  {
   "start": "H17.11",
   "end": "H17.13",
   "label": "Central corneal opacity"
  },
  {
   "start": "H17.811",
   "end": "H17.813",
   "label": "Minor opacity of cornea"
  },
  {
   "start": "H17.821",
   "end": "H17.823",
   "label": "Peripheral opacity of cornea"
  },
  {
   "start": "H17.89",
   "end": "H17.89",
   "label": "Other corneal scars and opacities"
  },
  {
   "start": "H17.9",
   "end": "H17.9",
   "label": "Unspecified corneal scar and opacity"
  },
  {
   "start": "H18.11",
   "end": "H18.13",
   "label": "Bullous keratopathy"
  },
  {
   "start": "H18.20",
   "end": "H18.20",
   "label": "Unspecified corneal edema"
  },
  {
   "start": "H18.211",
   "end": "H18.213",
   "label": "Corneal edema secondary to contact lens"
  },
  {
   "start": "H18.221",
   "end": "H18.223",
   "label": "Idiopathic corneal edema"
  },
  {
   "start": "H18.231",
   "end": "H18.233",
   "label": "Secondary corneal edema"
  },
  {
   "start": "H21.89",
   "end": "H21.89",
   "label": "Other specified disorders of iris and ciliary body"
  },
  {
   "start": "H22",
   "end": "H22",
   "label": "Disorders of iris and ciliary body in diseases classified elsewhere"
  },
  {
   "start": "H40.1210",
   "end": "H40.1294",
   "label": "Low-tension glaucoma"
  },
  {
   "start": "H40.1310",
   "end": "H40.1394",
   "label": "Pigmentary glaucoma"
  },
  {
   "start": "H40.1410",
   "end": "H40.1494",
   "label": "Capsular glaucoma with pseudoexfoliation of lens"
  },
  {
   "start": "H40.20X0",
   "end": "H40.20X4",
   "label": "Unspecified primary angle-closure glaucoma"
  },
  {
   "start": "H40.211",
   "end": "H40.213",
   "label": "Acute angle-closure glaucoma"
  },
  {
   "start": "H40.2210",
   "end": "H40.2294",
   "label": "Chronic angle-closure glaucoma"
  },
  {
   "start": "H40.231",
   "end": "H40.233",
   "label": "Intermittent angle-closure glaucoma"
  },
  {
   "start": "H40.241",
   "end": "H40.243",
   "label": "Residual stage of angle-closure glaucoma"
  },
  {
   "start": "H40.30X0",
   "end": "H40.33X4",
   "label": "Glaucoma secondary to eye trauma"
  },
  {
   "start": "H40.40X0",
   "end": "H40.43X4",
   "label": "Glaucoma secondary to eye inflammation"
  },
  {
   "start": "H40.50X0",
   "end": "H40.53X4",
   "label": "Glaucoma secondary to other eye disorders"
  },
  {
   "start": "H40.60X0",
   "end": "H40.63X4",
   "label": "Glaucoma secondary to drugs"
  },
  {
   "start": "H40.811",
   "end": "H40.813",
   "label": "Glaucoma with increased episcleral venous pressure"
  },
  {
   "start": "H40.821",
   "end": "H40.823",
   "label": "Hypersecretion glaucoma"
  },
  {
   "start": "H40.831",
   "end": "H40.833",
   "label": "Aqueous misdirection"
  },
  {
   "start": "H40.89",
   "end": "H40.89",
   "label": "Other specified glaucoma"
  },
  {
   "start": "H40.841",
   "end": "H40.843",
   "label": "Neovascular Secondary Angle-closure glaucoma"
  },
  {
   "start": "H42",
   "end": "H42",
   "label": "Glaucoma in diseases classified elsewhere"
  }
 ],
 "oct_nerve_1x": [
  {
   "start": "E08.311",
   "end": "E08.311",
   "label": "Diabetes mellitus due to underlying condition with unspecified diabetic retinopathy with macular edema"
  },
  {
   "start": "E08.319",
   "end": "E08.319",
   "label": "Diabetes mellitus due to underlying condition with unspecified diabetic retinopathy without macular edema"
  },
  {
   "start": "E08.3211",
   "end": "E08.3399",
   "label": "Diabetes mellitus due to underlying condition with diabetic retinopathy"
  },
  {
   "start": "E09.3211",
   "end": "E09.3399",
   "label": "Drug or chemical induced diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E10.311",
   "end": "E10.311",
   "label": "Type 1 diabetes mellitus with unspecified diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.319",
   "end": "E10.319",
   "label": "Type 1 diabetes mellitus with unspecified diabetic retinopathy without macular edema"
  },
  {
   "start": "E10.3211",
   "end": "E10.3219",
   "label": "Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.3291",
   "end": "E10.3299",
   "label": "Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E10.3311",
   "end": "E10.3319",
   "label": "Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.3391",
   "end": "E10.3399",
   "label": "Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.311",
   "end": "E11.311",
   "label": "Type 2 diabetes mellitus with unspecified diabetic retinopathy with macular edema"
  },
  {
   "start": "E11.319",
   "end": "E11.319",
   "label": "Type 2 diabetes mellitus with unspecified diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.3211",
   "end": "E11.3219",
   "label": "Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E11.3291",
   "end": "E11.3299",
   "label": "Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.3311",
   "end": "E11.3319",
   "label": "Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E11.3391",
   "end": "E11.3399",
   "label": "Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.311",
   "end": "E13.311",
   "label": "Other specified diabetes mellitus with unspecified diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.319",
   "end": "E13.319",
   "label": "Other specified diabetes mellitus with unspecified diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.3211",
   "end": "E13.3219",
   "label": "Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.3291",
   "end": "E13.3299",
   "label": "Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.3311",
   "end": "E13.3319",
   "label": "Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.3391",
   "end": "E13.3399",
   "label": "Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "H31.101",
   "end": "H31.103",
   "label": "Choroidal degeneration"
  },
  {
   "start": "H31.111",
   "end": "H31.113",
   "label": "Age-related choroidal atrophy"
  },
  {
   "start": "H31.121",
   "end": "H31.123",
   "label": "Diffuse secondary atrophy of choroid"
  },
  {
   "start": "H33.331",
   "end": "H33.333",
   "label": "Multiple defects of retina without detachment"
  },
  {
   "start": "H35.00",
   "end": "H35.00",
   "label": "Unspecified background retinopathy"
  },
  {
   "start": "H35.40",
   "end": "H35.469",
   "label": "Peripheral retinal degeneration"
  },
  {
   "start": "H35.50",
   "end": "H35.50",
   "label": "Unspecified hereditary retinal dystrophy"
  },
  {
   "start": "H35.51",
   "end": "H35.51",
   "label": "Vitreoretinal dystrophy"
  },
  {
   "start": "H35.52",
   "end": "H35.52",
   "label": "Pigmentary retinal dystrophy"
  },
  {
   "start": "H35.53",
   "end": "H35.53",
   "label": "Other dystrophies primarily involving the sensory retina"
  },
  {
   "start": "H35.54",
   "end": "H35.54",
   "label": "Dystrophies primarily involving the retinal pigment epithelium"
  },
  {
   "start": "H35.361",
   "end": "H35.363",
   "label": "Drusen (degenerative) of macula"
  },
  {
   "start": "H36",
   "end": "H36",
   "label": "Retinal disorders in diseases classified elsewhere"
  },
  {
   "start": "H46.01",
   "end": "H46.03",
   "label": "Optic papillitis"
  },
  {
   "start": "H46.11",
   "end": "H46.13",
   "label": "Retrobulbar neuritis"
  },
  {
   "start": "H46.2",
   "end": "H46.2",
   "label": "Nutritional optic neuropathy"
  },
  {
   "start": "H46.3",
   "end": "H46.3",
   "label": "Toxic optic neuropathy"
  },
  {
   "start": "H46.8",
   "end": "H46.8",
   "label": "Other optic neuritis"
  },
  {
   "start": "H46.9",
   "end": "H46.9",
   "label": "Unspecified optic neuritis"
  },
  {
   "start": "H47.011",
   "end": "H47.013",
   "label": "Ischemic optic neuropathy"
  },
  {
   "start": "H47.021",
   "end": "H47.023",
   "label": "Hemorrhage in optic nerve sheath"
  },
  {
   "start": "H47.031",
   "end": "H47.033",
   "label": "Optic nerve hypoplasia"
  },
  {
   "start": "H47.091",
   "end": "H47.093",
   "label": "Other disorders of optic nerve, not elsewhere classified"
  },
  {
   "start": "H47.10",
   "end": "H47.13",
   "label": "Papilledema"
  },
  {
   "start": "H47.141",
   "end": "H47.143",
   "label": "Foster-Kennedy syndrome"
  },
  {
   "start": "H47.20",
   "end": "H47.299",
   "label": "Optic atrophy"
  },
  {
   "start": "H47.311",
   "end": "H47.313",
   "label": "Coloboma of optic disc"
  },
  {
   "start": "H47.321",
   "end": "H47.323",
   "label": "Drusen of optic disc"
  },
  {
   "start": "H47.331",
   "end": "H47.333",
   "label": "Pseudopapilledema of optic disc"
  },
  {
   "start": "H47.391",
   "end": "H47.393",
   "label": "Other disorders of optic disc"
  },
  {
   "start": "H47.41",
   "end": "H47.49",
   "label": "Disorders of optic chiasm"
  },
  {
   "start": "H47.511",
   "end": "H47.539",
   "label": "Disorders of visual pathways"
  },
  {
   "start": "H47.611",
   "end": "H47.619",
   "label": "Cortical blindness"
  },
  {
   "start": "H47.621",
   "end": "H47.649",
   "label": "Disorders of visual cortex"
  },
  {
   "start": "H47.9",
   "end": "H47.9",
   "label": "Unspecified disorder of visual pathways"
  },
  {
   "start": "H53.40",
   "end": "H53.489",
   "label": "Visual field defects"
  },
  {
   "start": "Q15.0",
   "end": "Q15.0",
   "label": "Congenital glaucoma"
  }
 ],
 "oct_nerve_2x": [
  {
   "start": "D31.30",
   "end": "D31.30",
   "label": "Benign neoplasm of unspecified choroid"
  },
  {
   "start": "D31.31",
   "end": "D31.31",
   "label": "Benign neoplasm of right choroid"
  },
  {
   "start": "D31.32",
   "end": "D31.32",
   "label": "Benign neoplasm of left choroid"
  },
  {
   "start": "E08.3411",
   "end": "E08.3599",
   "label": "Diabetes mellitus due to underlying condition with diabetic retinopathy"
  },
  {
   "start": "E09.3411",
   "end": "E09.3599",
   "label": "Drug or chemical induced diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E10.3411",
   "end": "E10.3419",
   "label": "Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.3491",
   "end": "E10.3499",
   "label": "Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E10.3511",
   "end": "E10.3519",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.3521",
   "end": "E10.3529",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment involving the macula"
  },
  {
   "start": "E10.3531",
   "end": "E10.3539",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment not involving the macula"
  },
  {
   "start": "E10.3541",
   "end": "E10.3549",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy with combined traction retinal detachment and rhegmatogenous retinal detachment"
  },
  {
   "start": "E10.3551",
   "end": "E10.3559",
   "label": "Type 1 diabetes mellitus with stable proliferative diabetic retinopathy"
  },
  {
   "start": "E10.3591",
   "end": "E10.3599",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.3411",
   "end": "E11.3419",
   "label": "Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E11.3491",
   "end": "E11.3499",
   "label": "Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.3511",
   "end": "E11.3519",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy with macular edema, unspecified eye"
  },
  {
   "start": "E11.3521",
   "end": "E11.3529",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment involving the macula"
  },
  {
   "start": "E11.3531",
   "end": "E11.3539",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment not involving the macula"
  },
  {
   "start": "E11.3541",
   "end": "E11.3549",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy with combined traction retinal detachment and rhegmatogenous retinal detachment"
  },
  {
   "start": "E11.3551",
   "end": "E11.3559",
   "label": "Type 2 diabetes mellitus with stable proliferative diabetic retinopathy"
  },
  {
   "start": "E11.3591",
   "end": "E11.3599",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.3411",
   "end": "E13.3419",
   "label": "Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.3491",
   "end": "E13.3499",
   "label": "Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.3511",
   "end": "E13.3519",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.3521",
   "end": "E13.3529",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment involving the macula"
  },
  {
   "start": "E13.3531",
   "end": "E13.3539",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment not involving the macula"
  },
  {
   "start": "E13.3541",
   "end": "E13.3549",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy with combined traction retinal detachment and rhegmatogenous retinal detachment"
  },
  {
   "start": "E13.3551",
   "end": "E13.3559",
   "label": "Other specified diabetes mellitus with stable proliferative diabetic retinopathy"
  },
  {
   "start": "E13.3591",
   "end": "E13.3599",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "H33.001",
   "end": "H33.059",
   "label": "Retinal detachment with retinal break"
  },
  {
   "start": "H33.101",
   "end": "H33.103",
   "label": "Unspecified retinoschisis"
  },
  {
   "start": "H33.111",
   "end": "H33.113",
   "label": "Cyst of ora serrata"
  },
  {
   "start": "H33.191",
   "end": "H33.193",
   "label": "Other retinoschisis and retinal cysts"
  },
  {
   "start": "H33.21",
   "end": "H33.23",
   "label": "Serous retinal detachment"
  },
  {
   "start": "H33.301",
   "end": "H33.303",
   "label": "Unspecified retinal break"
  },
  {
   "start": "H33.311",
   "end": "H33.313",
   "label": "Horseshoe tear of retina without detachment"
  },
  {
   "start": "H33.321",
   "end": "H33.323",
   "label": "Round hole"
  },
  {
   "start": "H33.41",
   "end": "H33.43",
   "label": "Traction detachment of retina"
  },
  {
   "start": "H33.8",
   "end": "H33.8",
   "label": "Other retinal detachments"
  },
  {
   "start": "H34.00",
   "end": "H34.9",
   "label": "Retinal vascular occlusion"
  },
  {
   "start": "H35.011",
   "end": "H35.079",
   "label": "Background retinopathy and retinal vascular changes"
  },
  {
   "start": "H35.171",
   "end": "H35.173",
   "label": "Retrolental fibroplasia"
  },
  {
   "start": "H35.21",
   "end": "H35.22",
   "label": "Other non-diabetic proliferative retinopathy"
  },
  {
   "start": "H35.30",
   "end": "H35.389",
   "label": "Degeneration of macula and posterior pole"
  },
  {
   "start": "H35.61",
   "end": "H35.63",
   "label": "Retinal hemorrhage"
  },
  {
   "start": "H35.70",
   "end": "H35.739",
   "label": "Separation of retinal layers"
  },
  {
   "start": "H35.81",
   "end": "H35.81",
   "label": "Retinal edema"
  },
  {
   "start": "H35.82",
   "end": "H35.82",
   "label": "Retinal ischemia"
  },
  {
   "start": "H35.89",
   "end": "H35.89",
   "label": "Other specified retinal disorders"
  },
  {
   "start": "H35.9",
   "end": "H35.9",
   "label": "Unspecified retinal disorder"
  },
  {
   "start": "H40.001",
   "end": "H40.9",
   "label": "Glaucoma"
  },
  {
   "start": "H40.841",
   "end": "H40.843",
   "label": "Neovascular Secondary Angle-closure glaucoma"
  },
  {
   "start": "H42",
   "end": "H42",
   "label": "Glaucoma in diseases classified elsewhere"
  },
  {
   "start": "H44.21",
   "end": "H44.23",
   "label": "Degenerative myopia"
  },
  {
   "start": "H44.2A",
   "end": "H44.2A9",
   "label": "Degenerative myopia with choroidal neovascularization"
  },
  {
   "start": "H44.2B",
   "end": "H44.2B9",
   "label": "Degenerative myopia with macular hole"
  },
  {
   "start": "H44.2C",
   "end": "H44.2C9",
   "label": "Degenerative myopia with retinal detachment"
  },
  {
   "start": "H44.2D",
   "end": "H44.2D9",
   "label": "Degenerative myopia with foveoschisis"
  },
  {
   "start": "H44.2E",
   "end": "H44.2E9",
   "label": "Degenerative myopia with other maculopathy"
  },
  {
   "start": "Q14.2",
   "end": "Q14.2",
   "label": "Congenital malformation of optic disc"
  },
  {
   "start": "Q14.3",
   "end": "Q14.3",
   "label": "Congenital malformation of choroid"
  },
  {
   "start": "Q14.8",
   "end": "Q14.8",
   "label": "Other congenital malformations of posterior segment of eye"
  },
  {
   "start": "Q15.0",
   "end": "Q15.0",
   "label": "Congenital glaucoma"
  },
  {
   "start": "S05.10XA",
   "end": "S05.12XS",
   "label": "Contusion of eyeball and orbital tissues"
  }
 ],
 "oct_retina_1x": [
  {
   "start": "E08.311",
   "end": "E08.311",
   "label": "Diabetes mellitus due to underlying condition with unspecified diabetic retinopathy with macular edema"
  },
  {
   "start": "E08.319",
   "end": "E08.319",
   "label": "Diabetes mellitus due to underlying condition with unspecified diabetic retinopathy without macular edema"
  },
  {
   "start": "E08.3211",
   "end": "E08.3399",
   "label": "Diabetes mellitus due to underlying condition with diabetic retinopathy"
  },
  {
   "start": "E09.3211",
   "end": "E09.3399",
   "label": "Drug or chemical induced diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E10.311",
   "end": "E10.311",
   "label": "Type 1 diabetes mellitus with unspecified diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.319",
   "end": "E10.319",
   "label": "Type 1 diabetes mellitus with unspecified diabetic retinopathy without macular edema"
  },
  {
   "start": "E10.3211",
   "end": "E10.3219",
   "label": "Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.3291",
   "end": "E10.3299",
   "label": "Type 1 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E10.3311",
   "end": "E10.3319",
   "label": "Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.3391",
   "end": "E10.3399",
   "label": "Type 1 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.311",
   "end": "E11.311",
   "label": "Type 2 diabetes mellitus with unspecified diabetic retinopathy with macular edema"
  },
  {
   "start": "E11.319",
   "end": "E11.319",
   "label": "Type 2 diabetes mellitus with unspecified diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.3211",
   "end": "E11.3219",
   "label": "Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E11.3291",
   "end": "E11.3299",
   "label": "Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.3311",
   "end": "E11.3319",
   "label": "Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E11.3391",
   "end": "E11.3399",
   "label": "Type 2 diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.311",
   "end": "E13.311",
   "label": "Other specified diabetes mellitus with unspecified diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.319",
   "end": "E13.319",
   "label": "Other specified diabetes mellitus with unspecified diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.3211",
   "end": "E13.3219",
   "label": "Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.3291",
   "end": "E13.3299",
   "label": "Other specified diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.3311",
   "end": "E13.3319",
   "label": "Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.3391",
   "end": "E13.3399",
   "label": "Other specified diabetes mellitus with moderate nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "H31.101",
   "end": "H31.103",
   "label": "Choroidal degeneration"
  },
  {
   "start": "H31.111",
   "end": "H31.113",
   "label": "Age-related choroidal atrophy"
  },
  {
   "start": "H31.121",
   "end": "H31.123",
   "label": "Diffuse secondary atrophy of choroid"
  },
  {
   "start": "H33.331",
   "end": "H33.333",
   "label": "Multiple defects of retina without detachment"
  },
  {
   "start": "H35.00",
   "end": "H35.00",
   "label": "Unspecified background retinopathy"
  },
  {
   "start": "H35.40",
   "end": "H35.469",
   "label": "Peripheral retinal degeneration"
  },
  {
   "start": "H35.50",
   "end": "H35.50",
   "label": "Unspecified hereditary retinal dystrophy"
  },
  {
   "start": "H35.51",
   "end": "H35.51",
   "label": "Vitreoretinal dystrophy"
  },
  {
   "start": "H35.52",
   "end": "H35.52",
   "label": "Pigmentary retinal dystrophy"
  },
  {
   "start": "H35.53",
   "end": "H35.53",
   "label": "Other dystrophies primarily involving the sensory retina"
  },
  {
   "start": "H35.54",
   "end": "H35.54",
   "label": "Dystrophies primarily involving the retinal pigment epithelium"
  },
  {
   "start": "H35.361",
   "end": "H35.363",
   "label": "Drusen (degenerative) of macula"
  },
  {
   "start": "H36",
   "end": "H36",
   "label": "Retinal disorders in diseases classified elsewhere"
  },
  {
   "start": "H46.01",
   "end": "H46.03",
   "label": "Optic papillitis"
  },
  {
   "start": "H46.11",
   "end": "H46.13",
   "label": "Retrobulbar neuritis"
  },
  {
   "start": "H46.2",
   "end": "H46.2",
   "label": "Nutritional optic neuropathy"
  },
  {
   "start": "H46.3",
   "end": "H46.3",
   "label": "Toxic optic neuropathy"
  },
  {
   "start": "H46.8",
   "end": "H46.8",
   "label": "Other optic neuritis"
  },
  {
   "start": "H46.9",
   "end": "H46.9",
   "label": "Unspecified optic neuritis"
  },
  {
   "start": "H47.011",
   "end": "H47.013",
   "label": "Ischemic optic neuropathy"
  },
  {
   "start": "H47.021",
   "end": "H47.023",
   "label": "Hemorrhage in optic nerve sheath"
  },
  {
   "start": "H47.031",
   "end": "H47.033",
   "label": "Optic nerve hypoplasia"
  },
  {
   "start": "H47.091",
   "end": "H47.093",
   "label": "Other disorders of optic nerve, not elsewhere classified"
  },
  {
   "start": "H47.10",
   "end": "H47.13",
   "label": "Papilledema"
  },
  {
   "start": "H47.141",
   "end": "H47.143",
   "label": "Foster-Kennedy syndrome"
  },
  {
   "start": "H47.20",
   "end": "H47.299",
   "label": "Optic atrophy"
  },
  {
   "start": "H47.311",
   "end": "H47.313",
   "label": "Coloboma of optic disc"
  },
  {
   "start": "H47.321",
   "end": "H47.323",
   "label": "Drusen of optic disc"
  },
  {
   "start": "H47.331",
   "end": "H47.333",
   "label": "Pseudopapilledema of optic disc"
  },
  {
   "start": "H47.391",
   "end": "H47.393",
   "label": "Other disorders of optic disc"
  },
  {
   "start": "H47.41",
   "end": "H47.49",
   "label": "Disorders of optic chiasm"
  },
  {
   "start": "H47.511",
   "end": "H47.539",
   "label": "Disorders of visual pathways"
  },
  {
   "start": "H47.611",
   "end": "H47.619",
   "label": "Cortical blindness"
  },
  {
   "start": "H47.621",
   "end": "H47.649",
   "label": "Disorders of visual cortex"
  },
  {
   "start": "H47.9",
   "end": "H47.9",
   "label": "Unspecified disorder of visual pathways"
  },
  {
   "start": "H53.40",
   "end": "H53.489",
   "label": "Visual field defects"
  },
  {
   "start": "L93.0",
   "end": "L93.0",
   "label": "Discoid lupus erythematosus"
  },
  {
   "start": "L93.2",
   "end": "L93.2",
   "label": "Other local lupus erythematosus"
  },
  {
   "start": "M05.40",
   "end": "M05.40",
   "label": "or M05.49 Rheumatoid myopathy with rheumatoid arthritis"
  },
  {
   "start": "M05.50",
   "end": "M05.50",
   "label": "or M05.59 Rheumatoid polyneuropathy with rheumatoid arthritis"
  },
  {
   "start": "M05.70",
   "end": "M05.70",
   "label": "or M05.79 Rheumatoid arthritis with rheumatoid factor"
  },
  {
   "start": "M05.80",
   "end": "M05.80",
   "label": "or M05.89 Other rheumatoid arthritis with rheumatoid factor"
  },
  {
   "start": "M05.9",
   "end": "M05.9",
   "label": "Rheumatoid arthritis with rheumatoid factor, unspecified"
  },
  {
   "start": "M06.00",
   "end": "M06.00",
   "label": "or M06.09 Rheumatoid arthritis without rheumatoid factor"
  },
  {
   "start": "M06.80",
   "end": "M06.80",
   "label": "or M06.89 Other specified rheumatoid arthritis"
  },
  {
   "start": "M06.9",
   "end": "M06.9",
   "label": "Rheumatoid arthritis, unspecified"
  },
  {
   "start": "Q15.0",
   "end": "Q15.0",
   "label": "Congenital glaucoma"
  },
  {
   "start": "T37.2X1A",
   "end": "T37.2X4S",
   "label": "Poisoning by antimalarials and drugs"
  },
  {
   "start": "Z09",
   "end": "Z09",
   "label": "Encounter for follow-up examination after completed treatment for conditions other than malignant neoplasm"
  },
  {
   "start": "Z79.84",
   "end": "Z79.84",
   "label": "Long term (current) use of oral hypoglycemic drugs"
  }
 ],
 "oct_retina_2x": [
  {
   "start": "D31.30",
   "end": "D31.30",
   "label": "Benign neoplasm of unspecified choroid"
  },
  {
   "start": "D31.31",
   "end": "D31.31",
   "label": "Benign neoplasm of right choroid"
  },
  {
   "start": "D31.32",
   "end": "D31.32",
   "label": "Benign neoplasm of left choroid"
  },
  {
   "start": "E08.3411",
   "end": "E08.3599",
   "label": "Diabetes mellitus due to underlying condition with diabetic retinopathy"
  },
  {
   "start": "E09.3411",
   "end": "E09.3599",
   "label": "Drug or chemical induced diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E10.3411",
   "end": "E10.3419",
   "label": "Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.3491",
   "end": "E10.3499",
   "label": "Type 1 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E10.3511",
   "end": "E10.3519",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E10.3521",
   "end": "E10.3529",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment involving the macula"
  },
  {
   "start": "E10.3531",
   "end": "E10.3539",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment not involving the macula"
  },
  {
   "start": "E10.3541",
   "end": "E10.3549",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy with combined traction retinal detachment and rhegmatogenous retinal detachment"
  },
  {
   "start": "E10.3551",
   "end": "E10.3559",
   "label": "Type 1 diabetes mellitus with stable proliferative diabetic retinopathy"
  },
  {
   "start": "E10.3591",
   "end": "E10.3599",
   "label": "Type 1 diabetes mellitus with proliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.3411",
   "end": "E11.3419",
   "label": "Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E11.3491",
   "end": "E11.3499",
   "label": "Type 2 diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E11.3511",
   "end": "E11.3519",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy with macular edema, unspecified eye"
  },
  {
   "start": "E11.3521",
   "end": "E11.3529",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment involving the macula"
  },
  {
   "start": "E11.3531",
   "end": "E11.3539",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment not involving the macula"
  },
  {
   "start": "E11.3541",
   "end": "E11.3549",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy with combined traction retinal detachment and rhegmatogenous retinal detachment"
  },
  {
   "start": "E11.3551",
   "end": "E11.3559",
   "label": "Type 2 diabetes mellitus with stable proliferative diabetic retinopathy"
  },
  {
   "start": "E11.3591",
   "end": "E11.3599",
   "label": "Type 2 diabetes mellitus with proliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.3411",
   "end": "E13.3419",
   "label": "Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.3491",
   "end": "E13.3499",
   "label": "Other specified diabetes mellitus with severe nonproliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "E13.3511",
   "end": "E13.3519",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy with macular edema"
  },
  {
   "start": "E13.3521",
   "end": "E13.3529",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment involving the macula"
  },
  {
   "start": "E13.3531",
   "end": "E13.3539",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy with traction retinal detachment not involving the macula"
  },
  {
   "start": "E13.3541",
   "end": "E13.3549",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy with combined traction retinal detachment and rhegmatogenous retinal detachment"
  },
  {
   "start": "E13.3551",
   "end": "E13.3559",
   "label": "Other specified diabetes mellitus with stable proliferative diabetic retinopathy"
  },
  {
   "start": "E13.3591",
   "end": "E13.3599",
   "label": "Other specified diabetes mellitus with proliferative diabetic retinopathy without macular edema"
  },
  {
   "start": "H31.101",
   "end": "H31.103",
   "label": "Choroidal degeneration unspecified"
  },
  {
   "start": "H31.111",
   "end": "H31.113",
   "label": "Age-related choroidal atrophy"
  },
  {
   "start": "H31.121",
   "end": "H31.123",
   "label": "Diffuse secondary atrophy of choroid"
  },
  {
   "start": "H33.001",
   "end": "H33.059",
   "label": "Retinal detachment with retinal break"
  },
  {
   "start": "H33.101",
   "end": "H33.103",
   "label": "Unspecified retinoschisis"
  },
  {
   "start": "H33.111",
   "end": "H33.113",
   "label": "Cyst of ora serrata"
  },
  {
   "start": "H33.191",
   "end": "H33.193",
   "label": "Other retinoschisis and retinal cysts"
  },
  {
   "start": "H33.21",
   "end": "H33.23",
   "label": "Serous retinal detachment"
  },
  {
   "start": "H33.301",
   "end": "H33.303",
   "label": "Unspecified retinal break"
  },
  {
   "start": "H33.311",
   "end": "H33.313",
   "label": "Horseshoe tear of retina without detachment"
  },
  {
   "start": "H33.321",
   "end": "H33.323",
   "label": "Round hole"
  },
  {
   "start": "H33.41",
   "end": "H33.43",
   "label": "Traction detachment of retina"
  },
  {
   "start": "H33.8",
   "end": "H33.8",
   "label": "Other retinal detachments"
  },
  {
   "start": "H34.00",
   "end": "H34.9",
   "label": "Retinal vascular occlusion"
  },
  {
   "start": "H35.011",
   "end": "H35.079",
   "label": "Background retinopathy and retinal vascular changes"
  },
  {
   "start": "H35.171",
   "end": "H35.173",
   "label": "Retrolental fibroplasia"
  },
  {
   "start": "H35.21",
   "end": "H35.23",
   "label": "Other non-diabetic proliferative retinopathy"
  },
  {
   "start": "H35.30",
   "end": "H35.389",
   "label": "Degeneration of macula and posterior pole"
  },
  {
   "start": "H35.61",
   "end": "H35.63",
   "label": "Retinal hemorrhage"
  },
  {
   "start": "H35.70",
   "end": "H35.739",
   "label": "Separation of retinal layers"
  },
  {
   "start": "H35.81",
   "end": "H35.81",
   "label": "Retinal edema"
  },
  {
   "start": "H35.82",
   "end": "H35.82",
   "label": "Retinal ischemia"
  },
  {
   "start": "H35.89",
   "end": "H35.89",
   "label": "Other specified retinal disorders"
  },
  {
   "start": "H35.9",
   "end": "H35.9",
   "label": "Unspecified retinal disorder"
  },
  {
   "start": "H40.001",
   "end": "H40.9",
   "label": "Glaucoma"
  },
  {
   "start": "H40.841",
   "end": "H40.843",
   "label": "Neovascular Secondary Angle-closure glaucoma"
  },
  {
   "start": "H42",
   "end": "H42",
   "label": "Glaucoma in diseases classified elsewhere"
  },
  {
   "start": "H44.21",
   "end": "H44.23",
   "label": "Degenerative myopia"
  },
  {
   "start": "H44.2A",
   "end": "H44.2A9",
   "label": "Degenerative myopia with choroidal neovascularization"
  },
  {
   "start": "H44.2B",
   "end": "H44.2B9",
   "label": "Degenerative myopia with macular hole"
  },
  {
   "start": "H44.2C",
   "end": "H44.2C9",
   "label": "Degenerative myopia with retinal detachment"
  },
  {
   "start": "H44.2D",
   "end": "H44.2D9",
   "label": "Degenerative myopia with foveoschisis"
  },
  {
   "start": "H44.2E",
   "end": "H44.2E9",
   "label": "Degenerative myopia with other maculopathy"
  },
  {
   "start": "Q14.2",
   "end": "Q14.2",
   "label": "Congenital malformation of optic disc"
  },
  {
   "start": "Q14.3",
   "end": "Q14.3",
   "label": "Congenital malformation of choroid"
  },
  {
   "start": "Q14.8",
   "end": "Q14.8",
   "label": "Other congenital malformations of posterior segment of eye"
  },
  {
   "start": "Q15.0",
   "end": "Q15.0",
   "label": "Congenital glaucoma"
  },
  {
   "start": "S05.10XA",
   "end": "S05.12XS",
   "label": "Contusion of eyeball and orbital tissues"
  }
 ],
 "topo_1x": [
  {
   "start": "H11.001",
   "end": "H11.063",
   "label": "Pterygium"
  },
  {
   "start": "H52.211",
   "end": "H52.213",
   "label": "Irregular astigmatism"
  },
  {
   "start": "Q13.4",
   "end": "Q13.4",
   "label": "Congenital anomalies of corneal size and shape"
  }
 ],
 "topo_2x": [
  {
   "start": "H16.001",
   "end": "H16.073",
   "label": "Corneal ulcer"
  },
  {
   "start": "H17.00",
   "end": "H17.9",
   "label": "Corneal scars and opacities"
  },
  {
   "start": "H18.11",
   "end": "H18.13",
   "label": "Bullous keratopathy"
  },
  {
   "start": "H18.20",
   "end": "H18.20",
   "label": "Unspecified corneal edema"
  },
  {
   "start": "H18.221",
   "end": "H18.223",
   "label": "Other corneal edema"
  },
  {
   "start": "H18.40",
   "end": "H18.40",
   "label": "Corneal degeneration, unspecified"
  },
  {
   "start": "H18.451",
   "end": "H18.453",
   "label": "Nodular degeneration of cornea"
  },
  {
   "start": "H18.461",
   "end": "H18.463",
   "label": "Peripheral degenerations of cornea"
  },
  {
   "start": "H18.49",
   "end": "H18.49",
   "label": "Other corneal degenerations"
  },
  {
   "start": "H18.501",
   "end": "H18.599",
   "label": "Corneal dystrophies"
  },
  {
   "start": "H18.601",
   "end": "H18.623",
   "label": "Keratoconus"
  },
  {
   "start": "H18.70",
   "end": "H18.793",
   "label": "Other corneal deformities"
  },
  {
   "start": "H18.831",
   "end": "H18.833",
   "label": "Recurrent erosion of cornea"
  },
  {
   "start": "T26.11XA",
   "end": "T26.12XS",
   "label": "Burn of cornea and conjunctival sac"
  },
  {
   "start": "T26.61XA",
   "end": "T26.62XS",
   "label": "Corrosion of cornea and conjunctival sac"
  },
  {
   "start": "Z94.7",
   "end": "Z94.7",
   "label": "Corneal transplant status"
  }
 ],
 "gonio_2x": [
  {
   "start": "E08.311",
   "end": "E13.3599",
   "label": "Diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "H34.00",
   "end": "H34.9",
   "label": "Retinal Vascular Occlusion"
  },
  {
   "start": "H40.001",
   "end": "H40.063",
   "label": "Glaucoma Suspect"
  },
  {
   "start": "H40.10X0",
   "end": "H40.1194",
   "label": "Primary open-angle glaucoma"
  },
  {
   "start": "H40.20X0",
   "end": "H40.243",
   "label": "Primary Angle-closure Glaucoma"
  },
  {
   "start": "H40.61X0",
   "end": "H40.63X4",
   "label": "Glaucoma Secondary to Drugs"
  },
  {
   "start": "H40.841",
   "end": "H40.843",
   "label": "Neovascular Secondary Angle-closure glaucoma"
  },
  {
   "start": "Q15.0",
   "end": "Q15.0",
   "label": "Congenital Glaucoma"
  }
 ],
 "ext_ophth_1x": [
  {
   "start": "A39.82",
   "end": "A39.82",
   "label": "Meningococcal retrobulbar neuritis"
  },
  {
   "start": "A51.43",
   "end": "A51.43",
   "label": "Secondary syphilitic oculopathy"
  },
  {
   "start": "A52.19",
   "end": "A52.19",
   "label": "Other symptomatic neurosyphilis"
  },
  {
   "start": "B39.4",
   "end": "B39.9",
   "label": "Histoplasmosis"
  },
  {
   "start": "B58.01",
   "end": "B58.01",
   "label": "Toxoplasma chorioretinitis"
  },
  {
   "start": "C69.00",
   "end": "C69.92",
   "label": "Malignant neoplasm of eye and adnexa"
  },
  {
   "start": "D09.21",
   "end": "D09.22",
   "label": "Carcinoma in situ"
  },
  {
   "start": "D31.21",
   "end": "D31.22",
   "label": "Benign neoplasm of retina"
  },
  {
   "start": "D31.31",
   "end": "D31.32",
   "label": "Benign neoplasm of choroid"
  },
  {
   "start": "E08.311",
   "end": "E08.3599",
   "label": "Diabetes mellitus due to underlying condition with diabetic retinopathy"
  },
  {
   "start": "E09.311",
   "end": "E09.3599",
   "label": "Drug or chemical induced diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E10.311",
   "end": "E10.3599",
   "label": "Type 1 diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E10.36",
   "end": "E10.36",
   "label": "Type 1 diabetes mellitus with diabetic cataract"
  },
  {
   "start": "E10.39",
   "end": "E10.39",
   "label": "Type 1 diabetes mellitus with other diabetic ophthalmic complication"
  },
  {
   "start": "E10.65",
   "end": "E10.65",
   "label": "Type 1 diabetes mellitus with hyperglycemia"
  },
  {
   "start": "E11.311",
   "end": "E11.3599",
   "label": "Type 2 diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E11.36",
   "end": "E11.36",
   "label": "Type 2 diabetes mellitus with diabetic cataract"
  },
  {
   "start": "E11.39",
   "end": "E11.39",
   "label": "Type 2 diabetes mellitus with other diabetic ophthalmic complication"
  },
  {
   "start": "E11.65",
   "end": "E11.65",
   "label": "Type 2 diabetes mellitus with hyperglycemia"
  },
  {
   "start": "E13.311",
   "end": "E13.3599",
   "label": "Other specified diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E13.36",
   "end": "E13.36",
   "label": "Other specified diabetes mellitus with diabetic cataract"
  },
  {
   "start": "E13.39",
   "end": "E13.39",
   "label": "Other specified diabetes mellitus with other diabetic ophthalmic complication"
  },
  {
   "start": "H05.30",
   "end": "H05.359",
   "label": "Deformity of the orbit"
  },
  {
   "start": "H05.401",
   "end": "H05.429",
   "label": "Enophthalmos"
  },
  {
   "start": "H05.50",
   "end": "H05.53",
   "label": "Retained (old) foreign body following penetrating wound"
  },
  {
   "start": "H05.89",
   "end": "H05.89",
   "label": "Other disorders of orbit"
  },
  {
   "start": "H05.831",
   "end": "H05.833",
   "label": "Thyroid Orbitopathy"
  },
  {
   "start": "H15.811",
   "end": "H15.9",
   "label": "Other disorders of sclera"
  },
  {
   "start": "H16.241",
   "end": "H16.243",
   "label": "Ophthalmia nodosa"
  },
  {
   "start": "H20.00",
   "end": "H20.9",
   "label": "Iridocyclitis"
  },
  {
   "start": "H21.00",
   "end": "H21.9",
   "label": "Degeneration of iris and ciliary body"
  },
  {
   "start": "H21.331",
   "end": "H21.333",
   "label": "Parasitic cyst of iris, ciliary body or anterior chamber"
  },
  {
   "start": "H22",
   "end": "H22",
   "label": "Disorders of iris and ciliary body in diseases classified elsewhere"
  },
  {
   "start": "H30.001",
   "end": "H30.93",
   "label": "Chorioretinal inflammations"
  },
  {
   "start": "H31.101",
   "end": "H31.129",
   "label": "Choroidal degeneration"
  },
  {
   "start": "H33.001",
   "end": "H33.8",
   "label": "Retinal detachments and breaks"
  },
  {
   "start": "H34.00",
   "end": "H34.9",
   "label": "Retinal vascular occlusion"
  },
  {
   "start": "H35.00",
   "end": "H36",
   "label": "Other retinal disorders"
  },
  {
   "start": "H40.001",
   "end": "H40.9",
   "label": "Glaucoma"
  },
  {
   "start": "H40.841",
   "end": "H40.843",
   "label": "Neovascular Secondary Angle-closure"
  },
  {
   "start": "H42",
   "end": "H42",
   "label": "Glaucoma in diseases classified elsewhere"
  },
  {
   "start": "H43.00",
   "end": "H43.9",
   "label": "Disorders of vitreous body"
  },
  {
   "start": "H44.001",
   "end": "H44.029",
   "label": "Purulent endophthalmitis"
  },
  {
   "start": "H44.111",
   "end": "H44.9",
   "label": "Disorders of the globe"
  },
  {
   "start": "H46.00",
   "end": "H46.9",
   "label": "Optic neuritis"
  },
  {
   "start": "H47.011",
   "end": "H47.099",
   "label": "Disorders of optic nerve, not elsewhere classified"
  },
  {
   "start": "H47.10",
   "end": "H47.149",
   "label": "Papilledema"
  },
  {
   "start": "H47.20",
   "end": "H47.299",
   "label": "Optic atrophy"
  },
  {
   "start": "H47.311",
   "end": "H47.399",
   "label": "Other disorders of optic disc"
  },
  {
   "start": "H47.41",
   "end": "H47.49",
   "label": "Disorders of optic chiasm"
  },
  {
   "start": "M05.40",
   "end": "M05.40",
   "label": "Rheumatoid myopathy with rheumatoid arthritis of unspecified site"
  },
  {
   "start": "M05.49",
   "end": "M05.49",
   "label": "Rheumatoid myopathy with rheumatoid arthritis of multiple sites"
  },
  {
   "start": "M05.50",
   "end": "M05.50",
   "label": "Rheumatoid polyneuropathy with rheumatoid arthritis of unspecified site"
  },
  {
   "start": "M05.59",
   "end": "M05.59",
   "label": "Rheumatoid polyneuropathy with rheumatoid arthritis of multiple sites"
  },
  {
   "start": "M05.70",
   "end": "M05.70",
   "label": "Rheumatoid arthritis with rheumatoid factor of unspecified site without organ or systems involvement"
  },
  {
   "start": "M05.79",
   "end": "M05.79",
   "label": "Rheumatoid arthritis with rheumatoid factor of multiple sites without organ or systems involvement"
  },
  {
   "start": "M05.80",
   "end": "M05.80",
   "label": "Other rheumatoid arthritis with rheumatoid factor of unspecified site"
  },
  {
   "start": "M05.89",
   "end": "M05.89",
   "label": "Other rheumatoid arthritis with rheumatoid factor of multiple sites"
  },
  {
   "start": "M05.9",
   "end": "M05.9",
   "label": "Rheumatoid arthritis with rheumatoid factor, unspecified"
  },
  {
   "start": "M06.00",
   "end": "M06.00",
   "label": "Rheumatoid arthritis without rheumatoid factor, unspecified site"
  },
  {
   "start": "M06.09",
   "end": "M06.09",
   "label": "Rheumatoid arthritis without rheumatoid factor, multiple sites"
  },
  {
   "start": "M06.80",
   "end": "M06.80",
   "label": "Other specified rheumatoid arthritis, unspecified site"
  },
  {
   "start": "M06.89",
   "end": "M06.89",
   "label": "Other specified rheumatoid arthritis, multiple sites"
  },
  {
   "start": "M06.9",
   "end": "M06.9",
   "label": "Rheumatoid arthritis, unspecified"
  },
  {
   "start": "M08.00",
   "end": "M08.00",
   "label": "Unspecified juvenile rheumatoid arthritis of unspecified site"
  },
  {
   "start": "M08.09",
   "end": "M08.09",
   "label": "Unspecified juvenile rheumatoid arthritis, multiple sites"
  },
  {
   "start": "M08.20",
   "end": "M08.20",
   "label": "Juvenile rheumatoid arthritis with systemic onset, unspecified site"
  },
  {
   "start": "M08.29",
   "end": "M08.29",
   "label": "Juvenile rheumatoid arthritis with systemic onset, multiple sites"
  },
  {
   "start": "M08.3",
   "end": "M08.3",
   "label": "Juvenile rheumatoid polyarthritis (seronegative)"
  },
  {
   "start": "M08.40",
   "end": "M08.40",
   "label": "Pauciarticular juvenile rheumatoid arthritis, unspecified site"
  },
  {
   "start": "M08.89",
   "end": "M08.89",
   "label": "Other juvenile arthritis, multiple sites"
  },
  {
   "start": "M35.2",
   "end": "M35.2",
   "label": "Behcet's disease"
  },
  {
   "start": "Q14.0",
   "end": "Q14.9",
   "label": "Congenital malformation"
  },
  {
   "start": "Q15.0",
   "end": "Q15.0",
   "label": "Congenital glaucoma"
  },
  {
   "start": "Q85.00",
   "end": "Q85.02",
   "label": "Neurofibromatosis"
  },
  {
   "start": "S05.10XA",
   "end": "S05.12XS",
   "label": "Contusion of eye and adnexa"
  },
  {
   "start": "S05.50XA",
   "end": "S05.52XS",
   "label": "Penetrating wound with foreign body"
  },
  {
   "start": "S05.60XA",
   "end": "S05.62XS",
   "label": "Penetrating wound without foreign body"
  },
  {
   "start": "S05.8X1A",
   "end": "S05.92XS",
   "label": "Other injuries of eye and orbit"
  }
 ],
 "fundus_2x": [
  {
   "start": "E08.311",
   "end": "E08.3599",
   "label": "Diabetes mellitus due to underlying condition with diabetic retinopathy"
  },
  {
   "start": "E09.311",
   "end": "E09.3599",
   "label": "Drug or chemical induced diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E10.311",
   "end": "E10.3599",
   "label": "Type 1 diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E11.311",
   "end": "E11.3599",
   "label": "Type 2 diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "E13.311",
   "end": "E13.3599",
   "label": "Other specified diabetes mellitus with diabetic retinopathy"
  },
  {
   "start": "H30.001",
   "end": "H30.93",
   "label": "Chorioretinal inflammations"
  },
  {
   "start": "H31.001",
   "end": "H31.9",
   "label": "Other disorders of the choroid"
  },
  {
   "start": "H32",
   "end": "H32",
   "label": "Chorioretinal disorders in diseases classified elsewhere"
  },
  {
   "start": "H33.001",
   "end": "H33.8",
   "label": "Retinal detachments and breaks"
  },
  {
   "start": "H34.00",
   "end": "H34.9",
   "label": "Retinal vascular occlusion"
  },
  {
   "start": "H35.00",
   "end": "H36",
   "label": "Other retinal disorders"
  }
 ]
};
