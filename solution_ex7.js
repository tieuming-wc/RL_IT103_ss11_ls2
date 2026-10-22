"use strict";

const validateDeviceInput = (device) => {
  if (!device || typeof device !== "object") return false;
  if (
    !device.name ||
    typeof device.name !== "string" ||
    device.name.trim() === ""
  )
    return false;
  if (
    !device.room ||
    typeof device.room !== "string" ||
    device.room.trim() === ""
  )
    return false;
  if (typeof device.powerWatts !== "number" || device.powerWatts <= 0)
    return false;
  return true;
};

const generateDeviceId = (list) => {
  const nextNumber = list.length + 1;
  return `DEV_${String(nextNumber).padStart(3, "0")}`;
};

const createDevice = (list, newDev) => {
  if (!validateDeviceInput(newDev)) return null;

  const device = {
    id: generateDeviceId(list),
    name: newDev.name.trim(),
    room: newDev.room.trim(),
    powerWatts: newDev.powerWatts,
    isActive: newDev.isActive !== undefined ? Boolean(newDev.isActive) : false,
  };

  list.push(device);
  return device;
};

const readDevicesByRoom = (list, roomName) => {
  if (!roomName || typeof roomName !== "string") return [];
  const results = [];
  const targetRoom = roomName.trim().toLowerCase();

  for (let i = 0; i < list.length; i++) {
    if (list[i].room.toLowerCase() === targetRoom) {
      results.push(list[i]);
    }
  }

  return results;
};

const updateDevice = (list, id, updateData) => {
  if (!id || !updateData || typeof updateData !== "object") return false;

  let targetDevice = null;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      targetDevice = list[i];
      break;
    }
  }

  if (targetDevice === null) return false;

  if (
    updateData.name !== undefined &&
    typeof updateData.name === "string" &&
    updateData.name.trim() !== ""
  ) {
    targetDevice.name = updateData.name.trim();
  }

  if (
    updateData.room !== undefined &&
    typeof updateData.room === "string" &&
    updateData.room.trim() !== ""
  ) {
    targetDevice.room = updateData.room.trim();
  }

  if (
    updateData.powerWatts !== undefined &&
    typeof updateData.powerWatts === "number" &&
    updateData.powerWatts >= 0
  ) {
    targetDevice.powerWatts = updateData.powerWatts;
  }

  if (
    updateData.isActive !== undefined &&
    typeof updateData.isActive === "boolean"
  ) {
    targetDevice.isActive = updateData.isActive;
  }

  return true;
};

const deleteDevice = (list, id) => {
  if (!id) return false;

  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1);
      return true;
    }
  }

  return false;
};

const smartHomeDevices = [];

createDevice(smartHomeDevices, {
  name: "Dieu hoa Inverter",
  room: "Living Room",
  powerWatts: 1800,
  isActive: true,
});

createDevice(smartHomeDevices, {
  name: "Den chum LED",
  room: "Living Room",
  powerWatts: 45,
  isActive: true,
});

createDevice(smartHomeDevices, {
  name: "May loc khong khi",
  room: "Bedroom",
  powerWatts: 65,
  isActive: false,
});

createDevice(smartHomeDevices, {
  name: "Thiet bi loi cong suat",
  room: "Kitchen",
  powerWatts: 0,
});

console.log(
  "================ 1. DANH SÁCH THIẾT BỊ PHÒNG KHÁCH (LIVING ROOM) ================",
);
const livingRoomDevices = readDevicesByRoom(smartHomeDevices, "Living Room");
for (let i = 0; i < livingRoomDevices.length; i++) {
  const d = livingRoomDevices[i];
  console.log(
    `[${d.id}] ${d.name} | Phòng: ${d.room} | Công suất: ${d.powerWatts}W | Bật: ${d.isActive}`,
  );
}

console.log(
  "\n================ 2. CẬP NHẬT TRẠNG THÁI (TRÁNH BẪY FALSY: 0W, false) ================",
);
updateDevice(smartHomeDevices, "DEV_001", { isActive: false });
updateDevice(smartHomeDevices, "DEV_002", { powerWatts: 0 });

for (let i = 0; i < smartHomeDevices.length; i++) {
  const d = smartHomeDevices[i];
  console.log(
    `[${d.id}] ${d.name} | Phòng: ${d.room} | Công suất: ${d.powerWatts}W | Bật: ${d.isActive}`,
  );
}

console.log("\n================ 3. GỠ BỎ THIẾT BỊ DEV_002 ================");
const isDeleted = deleteDevice(smartHomeDevices, "DEV_002");
console.log(`Kết quả xóa DEV_002: ${isDeleted}`);

console.log(
  "\n================ 4. DANH SÁCH TỔNG KHO SAU CÙNG ================",
);
for (let i = 0; i < smartHomeDevices.length; i++) {
  const d = smartHomeDevices[i];
  console.log(
    `[${d.id}] ${d.name} | Phòng: ${d.room} | Công suất: ${d.powerWatts}W | Bật: ${d.isActive}`,
  );
}
