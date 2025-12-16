<template>
  <div>
    <v-card elevation="0">
      <v-toolbar color="transparent">
        <v-toolbar-title> Inventory Management System - Categories </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          prepend-icon="mdi-plus"
          class="text-capitalize"
          color="primary"
          variant="flat"
          @click="createDialog = true"
          >Create</v-btn
        >
      </v-toolbar>
      <v-divider></v-divider>

      <v-data-table :headers="headers" :items="categories"> </v-data-table>

      <!-- <v-data-table :headers="headers" :items="categories">
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            color="primary"
            size="small"
            :to="`/inventory/${item.documentId}`"
            >View</v-btn
          >
        </template>
      </v-data-table> -->
    </v-card>

    <v-dialog v-model="createDialog" width="400" persistent>
      <v-card>
        <v-toolbar>
        <v-toolbar-title>Create Categories</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="createDialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-toolbar>

        <v-card-text>
          <v-form ref="createCategoryForm" v-model="formValid" @submit.prevent="createCategories">
            <v-text-field v-model="categoryName" :rules="[rules.required]" label="Category Name" flat variant="solo-filled"></v-text-field>
            <v-btn block class="mt-5" color="primary" type="submit">Create</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="createDialog" width="500">
      <v-card>
        <v-toolbar color="green">
          <v-toolbar-title>Create Category</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn><v-icon>mdi-close</v-icon></v-btn> -->
          <v-btn icon="mdi-close" @click="createDialog = false"></v-btn>
        </v-toolbar>
        <v-card-text>
          <v-form ref="createCategoryForm" v-model="formValid">
            <v-text-field
              type="number"
              label="Category Name"
              v-model="categoryName"
              variant="outlined"
              :rules="[rules.required]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="green"
            variant="elevated"
            @click="createCategories()"
            block
            >Create</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar :color="snackbarColor" v-model="snackbar">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script  setup>
const baseUrl = useRuntimeConfig().public.strapiBaseURL;
const createDialog = ref(false);
const headers = [
  { title: "ID", value: "id" },
  { title: "Name", value: "name" },
  { title: "Created At", value: "createdAt" },
  { title: "", value: "actions" },
];
const categoryName = ref("");
const snackbar = ref(false);
const formValid = ref(true);
const createCategoryForm = ref(null);
const categories = ref([]);
const snackbarColor = ref("");
const snackbarText = ref("Snackbar Text");

const rules = {
  required: (v) => !!v || "Required",
  numeric: (v) => !isNaN(Number(v)) || "Must be a number",
  positive: (v) => Number(v) > 0 || "Must be greater than 0",
};

// Get Categories List
const getCategory = async () => {
  try {
    const res = await $fetch(`${baseUrl}/api/categories`);
    if (res) {
      console.log("Successfully fetched!", res.data);
      categories.value = res.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const getCategories = async () => {
  try {
    const res = await $fetch(`${baseUrl}/api/categories`);
    if (res) {
      categories.value = res.data;
      console.log(res.data);
    }
  } catch (err) {
    console.error("Failed to fetch data: ", err);
    throw err;
  }
};

const createCategories = async () => {
  const { valid } = await createCategoryForm.value.validate();
  if (!valid) return;
  try {
    await $fetch(`${baseUrl}/api/categories`, {
      method: "POST",
      body: {
        data: {
          name: categoryName.value,
        },
      },
    });

    console.log("Successfully Created!");
    snackbarColor.value = "success";
    snackbarText.value = "Category name successfully created!";
    snackbar.value = true;
    createCategoryForm.value?.reset();
    getCategory();
  } catch (err) {
    //if (err)
    console.log("Error creating:", err.data.error.message);
    snackbarColor.value = "error";
    snackbarText.value = "Category name already exist!";
    snackbar.value = true;
  }
};

// const createCategories = async () => {
//   const { valid } = await createCategoryForm.value.validate();
//   if (!valid) return;
//   try {
//     await $fetch(`${baseUrl}/api/categories`, {
//       method: "POST",
//       body: {
//         data: {
//           name: categoryName.value,
//         },
//       },
//     });

//     createCategoryForm.value?.reset();
//     getCategories();
//   } catch (err) {
//     console.error("Error creating item:", err);
//   }
// };

// async function createCat () {

// }

onMounted(async () => {
  // await getCategories();
  await getCategory();
});
</script>

<style>
</style>