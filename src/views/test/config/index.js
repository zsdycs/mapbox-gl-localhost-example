export const Circle = function({ ctx, x, y, dx, dy, radius, color }) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;

  this.radius = radius;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  this.update = function() {
    if (this.x + this.radius > 500 || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > 500 || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
};
